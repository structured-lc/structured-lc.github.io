### Leetcode 1296 (Medium): Divide Array in Sets of K Consecutive Numbers [Practice](https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers)

### Description  
Given an integer array `nums` and a positive integer `k`, determine if it's possible to split the array into groups where:
- Each group contains exactly **k** numbers  
- The numbers in each group are **consecutive** (each next element is previous "+1")

Return `True` if such a division is possible, otherwise `False`. Every element from `nums` must belong to exactly one group.

### Examples  

**Example 1:**  
Input: `nums=[1,2,3,3,4,4,5,6]`, `k=4`  
Output: `true`  
*Explanation: Group as [1,2,3,4] and [3,4,5,6].*

**Example 2:**  
Input: `nums=[3,2,1,2,3,4,3,4,5,9,10,11]`, `k=3`  
Output: `true`  
*Explanation: Groups can be [1,2,3], [2,3,4], [3,4,5], [9,10,11].*

**Example 3:**  
Input: `nums=[3,3,2,2,1,1]`, `k=3`  
Output: `true`  
*Explanation: Groups are [1,2,3] and [1,2,3].*

**Example 4:**  
Input: `nums=[1,2,3,4]`, `k=3`  
Output: `false`  
*Explanation: Can't break [1,2,3,4] into groups of 3 consecutive numbers.*


### Thought Process (as if you’re the interviewee)  
First, check divisibility: if len(nums) isn't divisible by k, it's impossible to group them as required.  
A brute-force approach (try all combinations) is infeasible—O(n!). Instead, sort the numbers and count frequency of each. Then, repeatedly try to build groups starting from the smallest unused number. For each group, reduce the count of each consecutive number by the required frequency. If any number is missing (frequency < 0), return False. 

Optimized approach uses a hashmap/counter and greedily always starts from the smallest unused number. This ensures no overlaps and uses each number the required number of times.

### Corner cases to consider  
- Array length not divisible by k  
- Duplicates that don't form full consecutive groups  
- Single element arrays  
- Large values and negative numbers  
- Gaps/breaks (missing numbers in what would be a consecutive run)


### Solution

```python
import collections

def isPossibleDivide(nums, k):
    # Count occurrences of each number
    count = collections.Counter(nums)
    # Iterate in order from smallest to largest
    for start in sorted(count):
        freq = count[start]
        if freq > 0:
            # Try to build a consecutive group starting at 'start'
            for i in range(start, start + k):
                count[i] -= freq
                if count[i] < 0:
                    return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N log N), where N = len(nums). Sorting the keys dominates.
- **Space Complexity:** O(N) for the counter to store element frequencies.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if k = 1 always?  
  *Hint: Is every number required to be used once?*

- Can you do it without sorting?  
  *Hint: Is the overhead from sorting negligible compared to group formation?*

- How do you generalize if you have overlapping groups allowed?  
  *Hint: Does unique grouping matter or repeat uses permitted?*

### Summary
This problem uses the **hashmap frequency counting** pattern and a greedy approach, always expanding consecutive sets from the smallest available number. This greedy technique is common for interval, sequencing, or grouping problems. Similar ideas appear in card games (straight hands validation), inventory grouping, and task scheduling challenges.


### Flashcard
Sort numbers and use a hash map to count frequencies, then build groups of consecutive numbers.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Split Array into Consecutive Subsequences(split-array-into-consecutive-subsequences) (Medium)
- All Divisions With the Highest Score of a Binary Array(all-divisions-with-the-highest-score-of-a-binary-array) (Medium)