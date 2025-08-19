### Leetcode 1308 (Medium): Running Total for Different Genders [Practice](https://leetcode.com/problems/running-total-for-different-genders)

### Description  
Given a table containing people's names, their gender (male/female), and corresponding scores, return a new table with the running total of the scores for each gender, ordered by their name. For each row, the running total is the sum of all previous and current scores for that gender, when sorted by name lexicographically.

### Examples  
**Example 1:**  
Input: Table=
| name  | gender | score |
|-------|--------|-------|
| Alice | female | 10    |
| Bob   | male   | 5     |
| Carol | female | 12    |
| Dave  | male   | 7     |
Output:
| name  | gender | score | running_total |
|-------|--------|-------|---------------|
| Alice | female | 10    | 10            |
| Bob   | male   | 5     | 5             |
| Carol | female | 12    | 22            |
| Dave  | male   | 7     | 12            |
*Explanation: For each gender, running_total accumulates score lexicographically by name.*

**Example 2:**  
Input: Table=
| name | gender | score |
|------|--------|-------|
| Zane | male   | 9     |
| Zack | male   | 2     |
| Zara | female | 11    |
Output:
| name | gender | score | running_total |
|------|--------|-------|---------------|
| Zara | female | 11    | 11            |
| Zack | male   | 2     | 2             |
| Zane | male   | 9     | 11            |
*Explanation: Only the gender group is considered when running totals are computed in name order.*

**Example 3:**  
Input: Table=
| name  | gender | score |
|-------|--------|-------|
| Ada   | female | 5     |
Output:
| name  | gender | score | running_total |
|-------|--------|-------|---------------|
| Ada   | female | 5     | 5             |
*Explanation: Single entry, so running_total is same as score.*

### Thought Process (as if you’re the interviewee)  
Initially, I would sort the input records by name to ensure lexicographical order. The key requirement is to track two separate running totals, one for male and one for female. As I iterate over the sorted records, I will maintain two variables to store running totals for each gender. For each row, if the gender is female, increment the female running total and vice versa for male. The running total for the current row is derived from the corresponding gender's accumulated sum thus far.

This can be implemented either as an SQL window function (using PARTITION BY gender ORDER BY name) or in procedural code with variables.

### Corner cases to consider  
- Only one gender appears in the input.
- Names that are lexicographically identical but different cases (if case-sensitive).
- Zero or negative scores.
- Scores with floating point values.
- Unordered input.
- Empty input table.
- Duplicate name+gender pairs.

### Solution

```python
# Simulate as if rows given as list of dicts {"name": ..., "gender": ..., "score": ...}
def running_total(records):
    # Sort by name
    records = sorted(records, key=lambda x: x['name'])
    totals = {"male": 0, "female": 0}
    result = []
    for entry in records:
        gender = entry['gender']
        totals[gender] += entry['score']
        row = dict(entry)  # Copy original
        row['running_total'] = totals[gender]
        result.append(row)
    return result
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n) (for sorting by name, where n = number of records), plus O(n) for scan.
- **Space Complexity:** O(n), as a new list is returned.

### Potential follow-up questions (as if you’re the interviewer)  
- What if we need to add other groupings besides gender?  
  *Hint: Generalize to group by multiple fields using keys or partitioning.*

- Can we do this entirely in SQL?  
  *Hint: Use window functions like SUM() OVER (PARTITION BY ... ORDER BY ...).*  

- How would you output only the most recent running total per gender?  
  *Hint: Use SQL's ROW_NUMBER or keep last only in code.*

### Summary
The problem is a variant of the cumulative sum (running total) per group pattern, partitioned by a field (here, "gender") and ordered by another ("name"). This approach is common in analytics, window aggregation, and can be extended to any number of groups or orderings.

### Tags
Database(#database)

### Similar Problems
- Last Person to Fit in the Bus(last-person-to-fit-in-the-bus) (Medium)