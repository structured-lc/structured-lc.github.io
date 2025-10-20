### Leetcode 1050 (Easy): Actors and Directors Who Cooperated At Least Three Times [Practice](https://leetcode.com/problems/actors-and-directors-who-cooperated-at-least-three-times)

### Description  
Given a database table called `ActorDirector`, each row records a **collaboration** between an actor and a director—in the form of an `actor_id`, a `director_id`, and a unique `timestamp` for the collaboration. The goal is to find all pairs of **actor_id** and **director_id** that have collaborated together **at least three times**. Output should be any order.

### Examples  

**Example 1:**  
Input:  
```
ActorDirector table:
| actor_id | director_id | timestamp |
|----------|-------------|----------|
|     1    |      1      |     0    |
|     1    |      1      |     1    |
|     1    |      1      |     2    |
|     1    |      2      |     3    |
|     1    |      2      |     4    |
|     2    |      1      |     5    |
|     2    |      1      |     6    |
```
Output:  
```
| actor_id | director_id |
|----------|-------------|
|    1     |      1      |
```
*Explanation: Only actor 1 and director 1 worked together three times. The other actor-director pairs collaborated less than three times.*

**Example 2:**  
Input:  
```
ActorDirector table:
| actor_id | director_id | timestamp |
|----------|-------------|----------|
|     1    |      2      |     0    |
|     1    |      2      |     1    |
|     1    |      2      |     2    |
|     2    |      2      |     3    |
|     2    |      2      |     4    |
|     2    |      2      |     5    |
|     3    |      4      |     6    |
```
Output:  
```
| actor_id | director_id |
|----------|-------------|
|    1     |      2      |
|    2     |      2      |
```
*Explanation: Both (1,2) and (2,2) collaborated three times each.*

**Example 3:**  
Input:  
```
ActorDirector table:
| actor_id | director_id | timestamp |
|----------|-------------|----------|
|     4    |      1      |    10    |
|     2    |      3      |    11    |
|     2    |      3      |    12    |
```
Output:  
```
(empty table)
```
*Explanation: No actor-director pair has 3 or more collaborations; answer is an empty set.*

### Thought Process (as if you’re the interviewee)  
- The naive approach is to count, for every possible (actor_id, director_id) pair, how many times they appear together in the table.
- This hints strongly at a **group by** operation: group all rows by both actor and director, then count the rows in each group.
- For any group where count is at least three, output the pair.
- In SQL, this is efficient and natural because group-by and aggregation (count) are core operations.
- There’s no need to filter or scan the data beforehand, since we group on all pairs.
- Even for large tables, databases optimize group-bys and counts well.

### Corner cases to consider  
- Table is empty ⇒ Output should be an empty set.
- No pairs meet the threshold ⇒ Output is empty.
- Multiple pairs meet threshold ⇒ All included, any order.
- An actor/director with exactly three collaborations ⇒ Should be included.
- Large timestamps (they don’t matter for grouping, but should be handled).
- Only one actor/director pair in the whole table.

### Solution

```python
# Since this is a SQL question, here is the equivalent Python pseudocode for interview simulation.
# The real implementation would be a SQL GROUP BY and HAVING clause, but shown in Python below:

from collections import defaultdict

def actors_and_directors_at_least_three(records):
    # records: List of [actor_id, director_id, timestamp]
    pair_count = defaultdict(int)
    for actor_id, director_id, timestamp in records:
        pair_count[(actor_id, director_id)] += 1

    result = []
    for (actor_id, director_id), count in pair_count.items():
        if count >= 3:
            result.append([actor_id, director_id])
    return result

# Example usage:
# input_records = [[1,1,0],[1,1,1],[1,1,2],[1,2,3],[1,2,4],[2,1,5],[2,1,6]]
# print(actors_and_directors_at_least_three(input_records))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in the table. Each row is read once and a dictionary increment and lookup is O(1).
- **Space Complexity:** O(k) where k is the number of unique (actor_id, director_id) pairs in the input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you find pairs that collaborated at least N times, where N can change?
  *Hint: Make the threshold a parameter instead of hard-coded 3.*

- How would you get the list of timestamps for each qualifying pair?
  *Hint: Store lists or use group aggregation to collect timestamps in each group.*

- Can you sort the results by the pair with the most collaborations first?
  *Hint: After grouping and counting, use a sorting step before selection/output.*

### Summary
This problem leverages the **group-by and aggregation** pattern common in SQL/database questions, with a straightforward Python mapping using dictionaries. This approach is widely used for tasks involving counting occurrences of unique pairs or combinations in large datasets, and scales well both in SQL and in-memory dictionary-based computation. This is a very standard and practical pattern for analytics and data summarization tasks.


### Flashcard
Use GROUP BY on (actor_id, director_id) and HAVING COUNT(*) ≥ 3 to find pairs who cooperated at least three times.

### Tags
Database(#database)

### Similar Problems
