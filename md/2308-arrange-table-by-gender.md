### Leetcode 2308 (Medium): Arrange Table by Gender [Practice](https://leetcode.com/problems/arrange-table-by-gender)

### Description  
You are given a table with user records. Each record has a `user_id` and their `gender`, which may be one of: 'female', 'other', or 'male'.  
**Rearrange the table** so that the rows alternate as much as possible between the three genders in this order:  
**'female' → 'other' → 'male'**, repeating as needed,  
and within each gender, users should appear in ascending order of their `user_id`. If any gender runs out earlier, continue the sequence with the remaining users of the other genders, always keeping the gender rotation order.

### Examples  

**Example 1:**  
Input:  
Genders table:  
| user_id | gender  |  
|---------|---------|  
|   3     |  female |  
|   6     |  male   |  
|   1     |  other  |  
|   2     |  male   |  
|   4     |  female |  

Output:  
| user_id | gender  |  
|---------|---------|  
|   3     |  female |  
|   1     |  other  |  
|   2     |  male   |  
|   4     |  female |  
|   6     |  male   |  

*Explanation:  
Order by sequence: 'female' (3), 'other' (1), 'male' (2), 'female' (4), then next available ('male' 6), since 'other' runs out.*

**Example 2:**  
Input:  
| user_id | gender  |  
|---------|---------|  
|   5     |  male   |  
|   4     |  male   |  
|   1     |  female |  

Output:  
| user_id | gender  |  
|---------|---------|  
|   1     |  female |  
|   4     |  male   |  
|   5     |  male   |  

*Explanation:  
After 'female', both 'other' and 'male' slots, but only 'male's are left, so fill with increasing user_id of 'male'.*

**Example 3:**  
Input:  
| user_id | gender  |  
|---------|---------|  
|   5     |  other  |  
|   3     |  other  |  
|   8     |  other  |  

Output:  
| user_id | gender  |  
|---------|---------|  
|   3     |  other  |  
|   5     |  other  |  
|   8     |  other  |  

*Explanation:  
There is only one gender ('other'). Output all sorted by user_id.*

### Thought Process (as if you’re the interviewee)  
First, I would try to simulate the exact "rotation" — picking the smallest user_id from 'female', then from 'other', then 'male', then repeating — until any list runs out, then skip that gender in the cycle.

**Brute-force:**  
- Put each gender’s user_ids into their own list, sorted.
- Use three pointers, one for each gender.
- Repeatedly loop through gender order, picking the next smallest user_id available, and output in that rotated order.
- Stop when all lists are empty.

**Optimization:**  
- All lists are sorted, so accesses are constant time.
- The rotation is always female → other → male.
- If a gender list is exhausted, skip it in rotation.

Rather than repeatedly checking which lists have elements, process batches — but since the number of users of each gender may differ, the rotation must account for missing entries.

**SQL Perspective:**  
- Assign a rank (row number) to each entry within their gender, sorted by user_id.
- Then interleave by these row numbers: first all with rank 1 (female, other, male), then rank 2 (female, other, male), etc.
- To break ties when a gender does not have a certain rank, they are skipped for that round.

**Trade-off:**  
- This approach guarantees correct alternation and ordering.
- Handles cases where some genders have fewer entries.

### Corner cases to consider  
- Empty table — return empty.
- Only one gender present.
- Some genders have one row, others have many.
- user_id is not unique (depends, but usually should be unique).
- If all user_ids same gender, output is sorted user_id ascending.

### Solution

```python
def arrange_table_by_gender(Genders):
    # Genders: list of dicts, each with {'user_id': int, 'gender': str}
    # Separate users by gender and sort each group by user_id
    genders = ['female', 'other', 'male']
    lists = {g: [] for g in genders}
    for row in Genders:
        lists[row['gender']].append(row['user_id'])
    for g in genders:
        lists[g].sort()
    
    # Counters for positions in lists
    idx = {g: 0 for g in genders}
    n_f = len(lists['female'])
    n_o = len(lists['other'])
    n_m = len(lists['male'])
    total = n_f + n_o + n_m
    
    res = []
    # Continue until total entries are collected
    while len(res) < total:
        for g in genders:
            if idx[g] < len(lists[g]):
                res.append({'user_id': lists[g][idx[g]], 'gender': g})
                idx[g] += 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N⋅G), where N is total rows and G is number of genders (here G=3, so practically O(N)). We sort each gender list, then interleave them in round-robin. All steps are linear or O(N log N) because of sorting on each gender’s sublist.
- **Space Complexity:** O(N), for the three gender lists and the output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if a new gender is added dynamically?
  *Hint: Generalize the code to handle any set or order of genders.*

- What if the order to interleave (female, other, male) changes dynamically per request?
  *Hint: Pass the gender order as an argument or query parameter.*

- How do you do this efficiently in SQL?
  *Hint: Use window functions (ROW_NUMBER/PARTITION BY) and order by (row number, gender order mapping).*

### Summary
This problem uses the **"interleaving by round robin"** pattern for merging multiple sorted lists in a specific cyclic order.  
The solution is a form of grouped alternation combined with order-by-within-group. This pattern is useful anywhere you need to fairly distribute elements from multiple groups in priority order, such as fair scheduling, team rotations, or merging sequenced events with "fairness" guarantees.  
The problem is also a great example of using either multi-pointer strategies in code or window functions (ROW_NUMBER, RANK) in SQL.


### Flashcard
Rotate through sorted gender lists, picking the smallest available user_id from each in turn until all are exhausted.

### Tags
Database(#database)

### Similar Problems
