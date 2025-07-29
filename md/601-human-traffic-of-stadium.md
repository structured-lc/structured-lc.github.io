### Leetcode 601 (Hard): Human Traffic of Stadium [Practice](https://leetcode.com/problems/human-traffic-of-stadium)

### Description  
Given a table `Stadium` with columns `id`, `visit_date`, and `people`, each row records the number of visitors present at a stadium on a unique date (i.e., no two rows share the same id or visit date, and ids are sequential with respect to date). Your task: **Find all records that belong to some sequence of three or more rows with consecutive ids, where each entry in the sequence has at least 100 people present.**  
Records should be returned in order of their `visit_date` (ascending).

### Examples  

**Example 1:**  
Input:
```
| id | visit_date | people |
|----|------------|--------|
| 1  | 2017-01-01 | 10     |
| 2  | 2017-01-02 | 109    |
| 3  | 2017-01-03 | 150    |
| 4  | 2017-01-04 | 99     |
| 5  | 2017-01-05 | 145    |
| 6  | 2017-01-06 | 1455   |
| 7  | 2017-01-07 | 199    |
| 8  | 2017-01-09 | 188    |
```
Output:
```
| id | visit_date | people |
|----|------------|--------|
| 5  | 2017-01-05 | 145    |
| 6  | 2017-01-06 | 1455   |
| 7  | 2017-01-07 | 199    |
| 8  | 2017-01-09 | 188    |
```
Explanation:  
Rows with ids 5, 6, 7, 8 all have people ≥ 100 and consecutive ids. So, output these four rows.

**Example 2:**  
Input:
```
| id | visit_date | people |
|----|------------|--------|
| 10 | 2020-04-18 | 102    |
| 11 | 2020-04-19 | 115    |
| 12 | 2020-04-20 | 101    |
| 13 | 2020-04-21 | 99     |
| 14 | 2020-04-22 | 103    |
| 15 | 2020-04-23 | 104    |
```
Output:
```
| id | visit_date | people |
|----|------------|--------|
| 10 | 2020-04-18 | 102    |
| 11 | 2020-04-19 | 115    |
| 12 | 2020-04-20 | 101    |
| 14 | 2020-04-22 | 103    |
| 15 | 2020-04-23 | 104    |
```
Explanation:  
Rows 10, 11, 12 form a valid sequence (consecutive ids, all ≥ 100); 14, 15 do not reach 3, so are excluded.

**Example 3:**  
Input:
```
| id | visit_date | people |
|----|------------|--------|
| 1 | 2021-06-01 | 99     |
| 2 | 2021-06-02 | 99     |
| 3 | 2021-06-03 | 99     |
```
Output:
```
(empty)
```
Explanation:  
No sequence of 3 or more consecutive ids has all entries with people ≥ 100.

### Thought Process (as if you’re the interviewee)  
First, I need to identify **consecutive id sequences** where each row has people ≥ 100, and which are at least 3 rows long.  
- The brute force way would be to check each possible slice of three or more consecutive ids and test the people ≥ 100 condition for each.  
- But that's O(n²) complexity and not efficient.

A better approach leverages the fact that:
- The `id` always increases with date, and consecutive ids means there are no gaps.
- I can scan over the data, keeping track of sequences of rows where people ≥ 100, and when such a sequence reaches 3+, I record all those rows.
- 
In SQL, row_number-based techniques ("find all sequences of at least k consecutive rows satisfying a condition") are common. In Python, I can implement a sliding window or grouping.

Approach:
- Sort the data by id.
- Iterate, maintaining a "current sequence" of rows. If the people count drops below 100, reset.
- If the current sequence length ≥ 3, add all those rows to the result (and continue extending if more qualifying rows).

Trade-offs:  
- This approach is O(n), only iterating the dataset once, and uses minimal extra space (to store the current valid sequence).  
- Extra attention is needed to include the final sequence at the end.

### Corner cases to consider  
- No rows with people ≥ 100.
- Rows with people ≥ 100 but only in groups of 1 or 2.
- Gaps in id (should not happen per problem statement, but always confirm).
- Exactly 3 qualifying consecutive rows.
- Sequences longer than 3 (should include all rows).
- Long sequence broken by a single small people value (should split into multiple sequences if more qualifying groups exist).

### Solution

```python
def human_traffic_of_stadium(stadium):
    """
    stadium: List of dicts. Each dict has 'id', 'visit_date', 'people' keys.
    Returns: List of dicts meeting the problem criteria.
    """
    if not stadium:
        return []

    # Sort rows by id for consecutive check
    stadium = sorted(stadium, key=lambda x: x['id'])
    # List for current qualifying sequence
    current_seq = []
    results = []

    for row in stadium:
        if row['people'] >= 100:
            # Maintain consecutive id sequence
            if current_seq and row['id'] == current_seq[-1]['id'] + 1:
                current_seq.append(row)
            else:
                # Before breaking, if we had ≥3, add them to results
                if len(current_seq) >= 3:
                    results.extend(current_seq)
                # Start new sequence
                current_seq = [row]
        else:
            if len(current_seq) >= 3:
                results.extend(current_seq)
            current_seq = []

    # Check at end for any leftover sequence
    if len(current_seq) >= 3:
        results.extend(current_seq)

    # Sort by visit_date for output format
    results.sort(key=lambda x: x['visit_date'])
    return results
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) (from sorting by id and then by visit_date); the rest is just single-pass O(n).
- **Space Complexity:** O(n) in the worst case (if all rows qualify, the result stores all the data).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt the solution if **ids were not guaranteed consecutive or strictly increasing by date?**  
  *Hint: Use visit_date to check consecutive days, or build ordered indices by date.*

- What if the requirement changed to **consecutive visit dates (by calendar), not just consecutive ids?**  
  *Hint: Convert visit_date to datetime and compare prev day +1 logic.*

- How would you do this efficiently if the table was **too large to fit in memory?**  
  *Hint: Use streaming algorithm, or SQL window functions for in-database processing.*

### Summary
This problem demonstrates a classic **sliding window / grouping** approach, using simple iteration and sequence tracking to find consecutive data subsequences. The pattern appears widely in log analysis, time-series chunking, and event grouping in both SQL and in-memory coding (Python, Java, etc). Understanding how to identify and group consecutive records with certain properties is very common in analytics and interviews.