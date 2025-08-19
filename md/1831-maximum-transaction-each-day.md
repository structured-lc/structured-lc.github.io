### Leetcode 1831 (Medium): Maximum Transaction Each Day [Practice](https://leetcode.com/problems/maximum-transaction-each-day)

### Description  
Given a table of transaction records where each row contains a transaction_id, a timestamp, and an amount, find all transaction IDs which have the maximum transaction amount for their respective day. If multiple transactions have the same maximum amount on the same day, include all such transaction IDs. Return the result sorted in ascending order by transaction_id.

### Examples  

**Example 1:**  
Input:  
Transactions table:  
| transaction_id | day                  | amount |
|----------------|---------------------|--------|
|      8         | 2021-04-03T15:57:28 |   57   |
|      9         | 2021-04-28T08:47:25 |   21   |
|      1         | 2021-04-29T13:28:30 |   58   |
|      5         | 2021-04-28T16:39:59 |   40   |
|      6         | 2021-04-29T23:39:28 |   58   |  
Output:  
`[1, 5, 6, 8]`  
*Explanation:*
- 2021-04-03: Only one transaction, ID=8, amount=57 → max=57 → transaction_id=8
- 2021-04-28: Two transactions, amounts=21 (ID=9) and 40 (ID=5). Max=40 → transaction_id=5
- 2021-04-29: Two transactions, amounts=58 (ID=1 and 6). Max=58 → transaction_ids=1,6
- Output all these transaction_ids, sorted: 1, 5, 6, 8

**Example 2:**  
Input:  
Transactions table:  
| transaction_id | day                  | amount |
|----------------|---------------------|--------|
|      3         | 2021-07-05T11:23:45 |   11   |  
|      2         | 2021-07-05T12:14:32 |   15   |  
|      7         | 2021-07-06T09:12:15 |   35   |  
Output:  
`[2, 7]`  
*Explanation:*
- 2021-07-05: Max amount is 15 → transaction_id=2
- 2021-07-06: Only one transaction with ID=7 (35) → transaction_id=7

**Example 3:**  
Input:  
Transactions table:  
| transaction_id | day                  | amount |
|----------------|---------------------|--------|
|      4         | 2022-01-01T18:00:00 |   42   |  
|      5         | 2022-01-01T07:09:03 |   42   |  
|      2         | 2022-01-02T11:11:11 |   6    |  
Output:  
`[4, 5, 2]`  
*Explanation:*
- 2022-01-01: Both transactions (ID=4,5) have the same maximum (42)
- 2022-01-02: Only one transaction ID=2 (6)
- Return: 2, 4, 5 (in sorted order)


### Thought Process (as if you’re the interviewee)  

The brute force way would be to:
- For each calendar day, find the largest amount recorded.
- Collect all transaction_ids from that day with amount equal to the max.

This is a classic "group by and max" problem per day.
- **Brute-force**: For each distinct day, scan all transactions to find max amount, then again scan to collect IDs → O(n²) due to repeated scans.
- **Optimized approach**:
  - **One Pass Map**: Use a hash map keyed by day; track (1) current max for the day, (2) list of IDs at that max.
    - For each transaction, extract the date part, and update the mapped value accordingly.
    - At the end, collect and sort all IDs.
    - This is efficient since each transaction is visited once.

The main trade-off is between code simplicity (brute) and efficiency (single traversal using grouping and max tracking).

### Corner cases to consider  
- Empty transactions table: should return empty result.
- Multiple transactions with same amount and same time on a day.
- All amounts are equal for a given day (all IDs must be in result).
- Only one transaction overall.
- Days with non-consecutive dates or only one transaction some days.


### Solution

```python
def max_transactions_each_day(transactions):
    """
    transactions: List of [transaction_id, datetime_str, amount]
    Returns: List of transaction_ids with per day max amount, ascending sorted
    """
    from collections import defaultdict
    
    # Map date_string → [current_max, list_of_ids]
    day_max = defaultdict(lambda: [float('-inf'), []])
    
    for tid, daystr, amt in transactions:
        # Get only the date component (YYYY-MM-DD)
        date_part = daystr[:10]
        max_so_far, ids = day_max[date_part]
        if amt > max_so_far:
            # New max for the day; reset the list
            day_max[date_part] = [amt, [tid]]
        elif amt == max_so_far:
            ids.append(tid)
            day_max[date_part][1] = ids

    # Gather all transaction_ids, flatten, and sort
    result = []
    for amt, ids in day_max.values():
        result.extend(ids)
    return sorted(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) for n transactions; each is processed once, and all IDs combined/sorted at the end is O(m log m) where m is number of output IDs (typically ≤ n).
- **Space Complexity:** O(d + n) where d = number of distinct days (for the hash map) and up to n for transaction IDs stored when all are maximums in their days.


### Potential follow-up questions (as if you’re the interviewer)  

- What if some days have thousands of max-tied transactions—how would you paginate or limit the output?  
  *Hint: Use SQL/LIMIT/join or in Python, batch output logic.*

- Could this be done efficiently on massive data in distributed systems?  
  *Hint: Map phase (group by day), then Reduce phase (track max & IDs).*

- What if the input data stream never fits in memory?  
  *Hint: Use external sort/group-by, or streaming aggregate by day, or process by day batches.*


### Summary
We solved the problem using the "group by key + track max and collect IDs" pattern.  
This same grouping/aggregation template applies to SQL "find max per group", as well as in Python/interview coding.  
It's common in frequency-based or max/min/group problems, and appears in event logs, statistics by category, and log/data stream aggregation.

### Tags
Database(#database)

### Similar Problems
