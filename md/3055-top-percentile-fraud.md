### Leetcode 3055 (Medium): Top Percentile Fraud [Practice](https://leetcode.com/problems/top-percentile-fraud)

### Description  
Given an insurance claims table, each record describes a **policy ID**, **state**, and **fraud score**.  
The goal is: *For each state, select the policy claims in the **top 5% by fraud score** (i.e., highest fraud risk in their state). Return these records ordered by*:
- **state** (ascending),
- **fraud_score** (descending),
- **policy_id** (ascending).

The output is a filtered list of the riskiest claims per state — useful for prioritizing fraud investigation resources.

### Examples  

**Example 1:**  
Input:  
A table `Fraud` with columns:  
policy_id | state  | fraud_score  
--- | --- | ---  
1 | CA | 89  
2 | CA | 99  
3 | CA | 80  
4 | TX | 100  
5 | TX | 75  
6 | NY | 95  
7 | NY | 50  
8 | NY | 75  

Output:  
policy_id | state | fraud_score  
2 | CA | 99  
4 | TX | 100  
6 | NY | 95  

*Explanation: For each state, list the top 5% of claims by fraud_score. (Since each state here has only a few records, top one per state is taken; in a larger dataset the 5% rule might select more.)*

**Example 2:**  
Input:  
policy_id | state | fraud_score  
10 | FL | 70  
11 | FL | 95  
12 | FL | 92  
13 | FL | 97  


Output:  
policy_id | state | fraud_score  
13 | FL | 97  


*Explanation: Only policy 13 is in the top 5% for Florida (as top 5% of 4 claims rounds down to just 1: the max).*

**Example 3:**  
Input:  
policy_id | state | fraud_score  
21 | WA | 90  
22 | WA | 88  

Output:  
policy_id | state | fraud_score  
21 | WA | 90  

*Explanation: When there are only a couple of claims in a state, only the highest is chosen as top percentile.*

### Thought Process (as if you’re the interviewee)  

- **Brute force:**  
  For each state, sort all claims by fraud_score descending. Calculate ⌊n \* 0.05⌋ (top 5% of n records). Select the highest ⌊n \* 0.05⌋ fraud scores for the state.

- **SQL window functions:**  
  - Use PERCENT_RANK() OVER (PARTITION BY state ORDER BY fraud_score DESC) to assign a percentile to each row within its state.  
  - For each claim with percent_rank < 0.05 (top 5%), select those.  
  - Result is then ordered as specified.

- **Why this works?**  
  - PERCENT_RANK assigns 0 to the top value(s), 1 to the lowest.  
  - percent_rank < 0.05 filters to the top 5% by fraud_score.

- **Tradeoffs:**  
  - Window functions are efficient and concise for this grouped/top percentile scenario.
  - This pattern scales, and avoids subqueries/counting or manual looping in application code.

### Corner cases to consider  
- State with only 1 or 2 claims (top 5% = 1 claim; so we return just the highest or all if tied).
- Multiple policies with same highest fraud score in a state (include all tied policy_ids).
- Empty table (output is empty).
- All policy_ids or states unique or with only one repeated state.
- Scores are identical for all records in a state (all are tied and considered top — PERCENT_RANK will assign 0 to all, so all included).
- Large number of claims for some states, small for others.

### Solution

```python
# Since this is an SQL problem, here's how we would approach it algorithmically:

# 1. For each state, compute the percentile rank of each claim by fraud_score descending.
# 2. Filter to rows with percentile rank < 0.05 (i.e., top 5%).
# 3. Order by: state (asc), fraud_score (desc), policy_id (asc).

# Pseudocode (not actual Python, but algorithmic):

WITH RankedFraud AS (
    SELECT
        policy_id,
        state,
        fraud_score,
        PERCENT_RANK() OVER (
            PARTITION BY state
            ORDER BY fraud_score DESC
        ) as pr
    FROM Fraud
)
SELECT policy_id, state, fraud_score
FROM RankedFraud
WHERE pr < 0.05
ORDER BY state ASC, fraud_score DESC, policy_id ASC

# If you had to code this in Python for an interview, 
# below is a simulation using Python data structures.

def top_percentile_fraud(fraud_records):
    # fraud_records: List of dict entries with 'policy_id', 'state', 'fraud_score'
    from collections import defaultdict

    # Gather records by state
    state_groups = defaultdict(list)
    for row in fraud_records:
        state_groups[row['state']].append(row)

    result = []
    for state, records in state_groups.items():
        # Sort state group by fraud_score descending, policy_id ascending
        records.sort(key=lambda x: (-x['fraud_score'], x['policy_id']))

        n = len(records)
        # If only 1 record, top 5% is one record
        count = max(1, int(n * 0.05))

        # Add the top records within count (could be more if tied at last included score)
        included = records[:count]
        # If there are ties at the cutoff, include all with same score as the last one in included
        if count < n:
            cutoff_score = included[-1]['fraud_score']
            # add more if tied at cutoff
            for extra in records[count:]:
                if extra['fraud_score'] == cutoff_score:
                    included.append(extra)
                else:
                    break
        result.extend(included)

    # Final sort as required
    result.sort(key=lambda r: (r['state'], -r['fraud_score'], r['policy_id']))
    return result

# Example usage:
# fraud_records = [
#     {'policy_id': 2, 'state': 'CA', 'fraud_score': 99},
#     {'policy_id': 1, 'state': 'CA', 'fraud_score': 89},
#     ...
# ]
# print(top_percentile_fraud(fraud_records))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Each state group is sorted by fraud_score (worst case all n in one state).
  - Final sorting is also O(n log n).
- **Space Complexity:** O(n)
  - Need to store all input and group/sort per state; extra data structures proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle ties at the percentile cutoff?
  *Hint: Consider including all claims with the cutoff score, even if it exceeds strict 5%.*

- What if the number of records per state is very large—how to scale?
  *Hint: Can this be distributed across machines or partitioned?*

- What if you had to compute the top 10%/20% or a dynamic percentile instead?
  *Hint: How would you parameterize the windowing logic for different percentiles?*

### Summary
This problem uses the **window function** (PERCENT_RANK/PERCENTILE mechanics) and partitioned sorting — a common SQL/data-pattern for **"top X% per group"** problems.  
This is very applicable for analytics on leaderboards, sales/achievement rankings, anomaly/outlier detection, and resource prioritization within categories.  
The approach generalizes well and is favored in data-driven interviews for its efficiency and clarity.

### Tags
Database(#database)

### Similar Problems
