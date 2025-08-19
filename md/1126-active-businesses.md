### Leetcode 1126 (Medium): Active Businesses [Practice](https://leetcode.com/problems/active-businesses)

### Description  
Given a table of events, where each row represents a business performing an event (such as a review, ad, or page view), each with a corresponding number of occurrences, identify all *active businesses*.  
A business is **active** if it has **more than one event type** for which its occurrences for that event are **strictly greater than the average occurrences for that event type** across all businesses.

In other words, for each business and event type, compare the business's occurrence count for that event type with the average across all businesses for that type. Count the number of distinct event types where the business exceeds the event average. A business appears in the result if it exceeds the average in more than one event type.

### Examples  

**Example 1:**  
Input:  

Events Table  
| business_id | event_type | occurrences |
|-------------|------------|-------------|
|      1      |  'ads'     |     7       |
|      2      |  'ads'     |     8       |
|      1      | 'reviews'  |    11       |
|      3      | 'reviews'  |     8       |
|      2      |  'page_views' | 12       |
|      2      |  'page_views' |  3       |

Output:  
`business_id`
```
1
```
*Explanation: Business 1 is above average for both 'ads' (7 > 7.5) and 'reviews' (11 > 9.5). It thus qualifies as active, having >1 such event type.*

**Example 2:**  
Input:  

| business_id | event_type | occurrences |
|-------------|------------|-------------|
|      2      |  'ads'     |     8       |
|      4      | 'reviews'  |     8       |
|      2      |  'page_views' | 12       |

Output:  
*(empty)*  
*Explanation: No business has more than one event type where they are above average compared to others.*

**Example 3:**  
Input:  

| business_id | event_type | occurrences |
|-------------|------------|-------------|
|      5      |  'ads'     |     15      |
|      5      | 'reviews'  |     8       |
|      5      | 'page_views' | 7        |
|      6      | 'reviews'  |    10       |

Output:  
`business_id`
```
5
```
*Explanation: Business 5 is above average in both 'ads' and 'reviews' events and is the only business with more than one such event type.*

### Thought Process (as if you’re the interviewee)  

First, I would look for businesses whose occurrences for various event types are above that event type's average.  
- Compute the average occurrences for each event type.
- For each business⸺event_type pair, check if occurrences are strictly greater than the corresponding event_type's average.
- Count for each business how many event types they exceeded the average for.
- Return businesses where that count > 1.

The brute-force way is:
1. For each event_type, calculate the average.
2. For each business, count the event types where its occurrence value exceeds the average.
3. Output businesses meeting the criteria.

To optimize, use SQL window functions to avoid multiple joins:
- Calculate the average using `AVG(occurrences) OVER (PARTITION BY event_type)`.
- Filter where occurrence > average.
- Group by business_id and count event types.

This is both readable and efficient, as a single pass with window function computes event_type averages.

### Corner cases to consider  
- Business with only one event type: cannot be active, even if above average.
- Businesses tied at the average: must be strictly greater.
- Event types that only have one business: average equals value, can't be above.
- No businesses qualify: empty output.
- All businesses qualify: output all.
- Occurrences are negative or zero: possible but unlikely per business logic; should still work.
- Multiple entries for same business and event type: are they allowed?

### Solution

```python
# Since the actual solution is meant for SQL, I'll provide the logic as Python as per template.

def active_businesses(events):
    # events: List of dicts: {'business_id': int, 'event_type': str, 'occurrences': int}
    from collections import defaultdict

    # Step 1: Collect all occurrences by event_type
    event_type_occurrences = defaultdict(list)
    for e in events:
        event_type_occurrences[e['event_type']].append(e['occurrences'])
    
    # Step 2: Compute average per event_type
    event_type_avg = {}
    for event_type, occ_list in event_type_occurrences.items():
        event_type_avg[event_type] = sum(occ_list) / len(occ_list)
    
    # Step 3: For each business-event_type, check if occ > avg
    business_event_above_avg = defaultdict(set)  # business_id -> set of event_types

    for e in events:
        if e['occurrences'] > event_type_avg[e['event_type']]:
            business_event_above_avg[e['business_id']].add(e['event_type'])
    
    # Step 4: Business is active if more than 1 event_type above avg
    res = []
    for business_id, events in business_event_above_avg.items():
        if len(events) > 1:
            res.append(business_id)
    
    # Output sorted for consistency, as in SQL
    return sorted(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of events.  
  - Each step (building lists, averaging, checking above-avg) is O(n).
- **Space Complexity:** O(n):  
  - Need to hold all events, plus a mapping from business/event_type to track above-avg cases.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution handle millions of records efficiently?  
  *Hint: Think about SQL window functions or database indexing.*

- What if a business can have multiple records per event_type (aggregate before comparison)?  
  *Hint: Consider a GROUP BY before doing the above-average check.*

- Could you generalize this to "top K" businesses by event activity types?  
  *Hint: Parametrize the number of required event types per business.*

### Summary
This solution uses the **grouping and window average pattern**—group by event_type to get averages, then filter and count per business.  
This is a common SQL interview pattern for above-average queries and can be used for similar "ranking" or "active-user" scenarios, especially where the "active" definition depends on being better than peers across categories.

### Tags
Database(#database)

### Similar Problems
