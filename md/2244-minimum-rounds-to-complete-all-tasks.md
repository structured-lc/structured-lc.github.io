### Leetcode 2244 (Medium): Minimum Rounds to Complete All Tasks [Practice](https://leetcode.com/problems/minimum-rounds-to-complete-all-tasks)

### Description  
Given an array of integers `tasks`, where each `tasks[i]` represents the difficulty level of a task. In each round, you may complete either 2 or 3 tasks of the **same difficulty**. Return the **minimum number of rounds** required to complete all tasks, or **-1** if it’s impossible to do so.

### Examples  

**Example 1:**  
Input: `tasks = [2,2,3,3,2,4,4,4,4,4]`  
Output: `4`  
*Explanation:  
- First round: complete 3 tasks of difficulty 2.  
- Second round: 2 tasks of difficulty 3.  
- Third round: 3 tasks of difficulty 4.  
- Fourth round: 2 tasks of difficulty 4.  
No fewer than 4 rounds can finish all tasks.*

**Example 2:**  
Input: `tasks = [2,3,3]`  
Output: `-1`  
*Explanation:  
There’s only 1 task of difficulty 2, which cannot be completed (must be 2 or 3 at once of the same type). So it’s impossible.*

**Example 3:**  
Input: `tasks = [5,5,5,5]`  
Output: `2`  
*Explanation:  
Complete two rounds of 2 tasks (both with difficulty 5). Total 2 rounds.*

### Thought Process (as if you’re the interviewee)  
First, group the tasks by difficulty using a frequency map. For each difficulty, count how many tasks appear.

Observation: Each round must consist **only** of 2 or 3 tasks of the **same difficulty**.

**Brute force:**  
For each group, try all possible combinations of 2s and 3s that sum to the count. For larger numbers, this is inefficient.

**Better approach:**  
Let `cnt` be the occurrence of a given difficulty:

- If `cnt == 1`: return -1 (impossible, since you can't form a round)
- For `cnt >= 2`: To achieve the **fewest** rounds, always use as many 3s as possible, because 3 > 2 (so fewer total rounds for a given count).

Let’s try:
- For `cnt = 5`: best is 3+2 = 2 rounds
- For `cnt = 4`: 2+2 = 2 rounds (can’t do 3+1, as 1 can't stand alone)
- For `cnt = 7`: 3+2+2 = 3 rounds (again, keep taking 3s, then do 2 if leftover is 2 or 4)
- General:  
  - rounds = cnt // 3  
  - if cnt % 3 == 0: all 3s  
  - if cnt % 3 == 1: need to convert a group of 3 '3's to two '2's (e.g., for 7, can't have 3+3+1, so we do 2+2+3)
  - But in this task, since we can only do 2 or 3 at a time, for remainder == 1, it's better to transform some 3s to 2+2.

But, if cnt == 1, impossible; for the rest,  
- total_rounds = cnt // 3  
- If cnt % 3 != 0 → add 1 extra round (either a 2 or 3, only happens if remainder is 2)

This greedy strategy is justified because 3 is better than 2.

### Corner cases to consider  
- Only one occurrence of any task (impossible)
- cnt == 2 (single round, possible)
- Large cnt, like 100000 (should not TLE)
- Multiple types, some possible, some not (should detect impossibility)
- All tasks are of a single type

### Solution

```python
def minimumRounds(tasks):
    # Count frequency of each task difficulty
    freq = {}
    for t in tasks:
        if t in freq:
            freq[t] += 1
        else:
            freq[t] = 1

    rounds = 0
    for count in freq.values():
        if count == 1:
            return -1  # Cannot complete if only one task of a type

        # Number of full 3-task rounds
        group_3 = count // 3
        remainder = count % 3

        # If there's any remainder, need an extra round (which will be of 2 tasks)
        if remainder == 0:
            rounds += group_3
        else:
            # if remainder is 1 or 2, always just one more round using 2 tasks
            rounds += group_3 + 1

    return rounds
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of tasks. One pass to count, another over unique types (unique types ≤ n).
- **Space Complexity:** O(n) in the worst case, if all tasks are unique, due to the hashmap (freq).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the size of a round could be any number k (e.g. 2 ≤ k ≤ 10)?
  *Hint: Try to generalize your grouping and remainder logic for flexible group sizes.*

- How do you handle extremely large task arrays efficiently (e.g., streaming input)?
  *Hint: Think about counting on the fly or chunk processing, possibly with external storage.*

- Can you return not just the minimal number of rounds, but also the actual rounds (groupings)?
  *Hint: Consider how you’d store and output actual task groupings per round.*

### Summary
This problem uses the **greedy grouping** pattern, minimizing rounds by forming the largest possible allowed group (here, 3), and only using smaller allowed groups (here, 2) when needed. Patterns like this are seen in problems involving partitioning numbers under grouping constraints. The logic—prefer large allowed group sizes to minimize the number of actions—applies universally in such settings (e.g. coin change, scheduling, packing problems).

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Counting(#counting)

### Similar Problems
- Climbing Stairs(climbing-stairs) (Easy)
- Odd String Difference(odd-string-difference) (Easy)
- Minimum Levels to Gain More Points(minimum-levels-to-gain-more-points) (Medium)