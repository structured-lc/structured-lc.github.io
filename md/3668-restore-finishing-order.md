### Leetcode 3668 (Easy): Restore Finishing Order [Practice](https://leetcode.com/problems/restore-finishing-order)

### Description  
Given two arrays:
- **order**: a permutation of 1 to n, representing the finishing order in a race (i.e., order[i] is the ID of the runner finishing at position i + 1);
- **friends**: a list of your friends' IDs (unique subset of 1 to n).

Return the list of your friends' IDs in the order they finished the race.

*In other words: filter order to only include entries that are present in friends, preserving finishing order.*

### Examples  

**Example 1:**  
Input: `order = [3,1,2,5,4]`, `friends = [4,1]`  
Output: `[1,4]`  
*Explanation: In the finished order, 1 appears before 4. So the answer is [1,4].*

**Example 2:**  
Input: `order = [2,3,1]`, `friends = [1,3]`  
Output: `[3,1]`  
*Explanation: In the result sequence, runners 3 and 1 (that are friends) appear in this order.*

**Example 3:**  
Input: `order = [1,2,3,4,5]`, `friends = `  
Output: `[]`  
*Explanation: No friends are in the order, so the result is an empty list.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Iterate over order, and for every element, check if it's in friends. This takes O(n × m), where n = len(order) and m = len(friends).

- **Optimized Approach:**  
  Since friends contains unique IDs, convert it to a set for O(1) lookup. Then, iterate through order and add to output if the value is in the friends set. This reduces the time complexity to O(n + m):  
  - O(m) to build the set  
  - O(n) to scan order and filter

- **Why this approach:**  
  This is space-efficient (just a set of size m), avoids unnecessary repeated scans, and is simple. Trade-off is minor extra space for the set.

### Corner cases to consider  
- Empty **order** (should return [])
- Empty **friends** (should return [])
- No friends found in order (should return [])
- friends consists of all runners (output is same as order)
- order and friends have 1 element each or overlap in 1 element
- Duplicates in order or friends? (According to problem, both are unique.)

### Solution

```python
def restoreFinishingOrder(order, friends):
    # Convert friends to a set for O(1) lookup
    friends_set = set(friends)
    # Initialize output list
    result = []
    # Iterate order; keep only IDs which are in friends
    for participant in order:
        if participant in friends_set:
            result.append(participant)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m) — O(m) to build the set, O(n) to scan order and filter.
- **Space Complexity:** O(m) for the set, plus O(k) for the output where k ≤ m (number of friends found).

### Potential follow-up questions (as if you’re the interviewer)  

- What if order is extremely large and friends is huge?  
  *Hint: How can you reduce memory usage for the friends set, or process as streams?*

- How would you handle if friends had duplicates?  
  *Hint: Should you deduplicate at the start?*

- Can you generalize this to handle string IDs or non-consecutive IDs?  
  *Hint: Does your algorithm depend on integer or consecutive IDs?*

### Summary
The pattern is **filtering a sequence based on membership in a set**, a very common algorithmic building block. This is used frequently in database queries (WHERE ... IN), set operations, and similar LeetCode tasks. The problem highlights the value of transforming an array into a set for efficient lookup.

### Tags

### Similar Problems
