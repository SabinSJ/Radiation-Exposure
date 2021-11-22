package com.radiationexposure.commons.backend.service;

import com.radiationexposure.commons.backend.model.PocketGeigerDTO;
import com.radiationexposure.commons.backend.repository.PocketGeigerRepository;
import com.radiationexposure.commons.backend.service.api.PocketGeigerService;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MatchQueryBuilder;
import org.elasticsearch.rest.RestStatus;
import org.elasticsearch.script.Script;
import org.elasticsearch.script.ScriptType;
import org.elasticsearch.search.aggregations.Aggregation;
import org.elasticsearch.search.aggregations.AggregationBuilder;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.Aggregations;
import org.elasticsearch.search.aggregations.bucket.histogram.DateHistogramInterval;
import org.elasticsearch.search.aggregations.metrics.AvgAggregationBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PocketGeigerServiceImpl implements PocketGeigerService {

    @Autowired
    PocketGeigerRepository pocketGeigerRepository;

    private RestHighLevelClient client;

    @Autowired
    public void PocketGeigerService(@Qualifier("restClient") RestHighLevelClient client)
    {
        this.client = client;
    }

    @Override
    public PocketGeigerDTO save(final PocketGeigerDTO pocketGeigerDTO) { return pocketGeigerRepository.save(pocketGeigerDTO); }


    @Override
    public Iterable<PocketGeigerDTO> findAll() { return pocketGeigerRepository.findAll(); }

    @Override
    public Iterable<PocketGeigerDTO> findBySensorOrderByTimestampAsc(String sensor) {
        return pocketGeigerRepository.findBySensorOrderByTimestampAsc(sensor);
    }

    @Override
    public Iterable<PocketGeigerDTO> findByTimestampGreaterThanEqualOrderByTimestampAsc(long timestamp) {
        return pocketGeigerRepository.findByTimestampGreaterThanEqualOrderByTimestampAsc(timestamp);
    }

    @Override
    public Iterable<PocketGeigerDTO> findByTimestampGreaterThanEqualAndTimestampLessThanEqualOrderByTimestampAsc(long timestamp_startOfDay, long timestamp_endOfDay) {
        return pocketGeigerRepository.findByTimestampGreaterThanEqualAndTimestampLessThanEqualOrderByTimestampAsc(timestamp_startOfDay,timestamp_endOfDay);
    }

    public List<Aggregation> findMonths() throws IOException{

        SearchRequest searchRequest = new SearchRequest("brasov-dev");

        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        AggregationBuilder aggregationBuilder = AggregationBuilders
                .dateHistogram("avg_values_per_month")
                .field("TimeStamp")
                .calendarInterval(DateHistogramInterval.MONTH)
                .format("MMM");

        searchSourceBuilder.aggregation(aggregationBuilder);

        searchRequest.source(searchSourceBuilder);

        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        RestStatus status = searchResponse.status();

        Aggregations firstAggregations = searchResponse.getAggregations();

        if(status == RestStatus.OK)
            return (firstAggregations.asList());
        else
            return null;
    }

    public List<Aggregation> findAverageValueMonthly() throws IOException{

        SearchRequest searchRequest = new SearchRequest("pocket-geiger-data");

        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        AvgAggregationBuilder averageCoverageAggregationBuilder = AggregationBuilders
                .avg("avg")
                .field("Value");

        AggregationBuilder aggregationBuilder = AggregationBuilders
                .dateHistogram("avg_values_per_month")
                .script(prepareUpdateScript())
                .calendarInterval(DateHistogramInterval.MONTH)
                .format("MMM")
                .subAggregation(averageCoverageAggregationBuilder);

        searchSourceBuilder.aggregation(aggregationBuilder);

        searchRequest.source(searchSourceBuilder);

        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        RestStatus status = searchResponse.status();

        Aggregations firstAggregations = searchResponse.getAggregations();

        if(status == RestStatus.OK)
            return (firstAggregations.asList());
        else
            return null;
    }

    private Script prepareUpdateScript() {

        int multiplier = 1000;

        String scriptStr = "doc['TimeStamp'] * multiplier";
        Map<String, Object> params = new HashMap<>();
        params.put("multiplier", multiplier);

        return new Script(ScriptType.INLINE, "expression", scriptStr, params);
    }
}