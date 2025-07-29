### Leetcode 659 (Medium): Split Array into Consecutive Subsequences [Practice](https://leetcode.com/problems/split-array-into-consecutive-subsequences)

### Description  
You are given an integer array `nums` that is sorted in non-decreasing order.  
The goal is to determine if you can split `nums` into one or more **subsequences** such that:

- Each subsequence is a sequence of **consecutive increasing numbers** (each number is exactly one more than the previous).
- Each subsequence has a **length of at least 3**.

A *subsequence* is formed by deleting some (or no) elements, without disturbing the order of the remaining elements.

Return `True` if such a split is possible, otherwise return `False`.

### Examples  

**Example 1:**  
Input: `[1,2,3,3,4,5]`  
Output: `True`  
*Explanation: The array can be split into [1,2,3] and [3,4,5]. Both are length ≥ 3 and consecutive.*

**Example 2:**  
Input: `[1,2,3,3,4,4,5,5]`  
Output: `True`  
*Explanation: One split is [1,2,3,4,5] and [3,4,5]. Both are consecutive and length ≥ 3.*

**Example 3:**  
Input: `[1,2,3,4,4,5]`  
Output: `False`  
*Explanation: It's not possible to split all numbers into consecutive subsequences of length ≥ 3.*

### Thought Process (as if you’re the interviewee)  
At first glance, one brute-force way is to try all possible groupings, but this will be highly inefficient.

A better way is:
- Always try to **extend existing subsequences** (ending at `num - 1`) with the current `num`.
- If you can't extend, try to **start a new subsequence** at `num` (by making sure `num+1` and `num+2` exist).
- If neither is possible, return `False` immediately.

To implement this, we can use two hash maps:
- `freq`: Counts remaining occurrences of each number (similar to a “pool” of numbers left to use).
- `append`: Counts how many subsequences end with a particular number (how many groups "need" the next consecutive number).

For each number in the array:
- If `freq[num] == 0`, skip (already used).
- If there's a subsequence ending with `num-1` (`append[num-1] > 0`), use `num` to extend it.
- If not, check if `num+1` and `num+2` are available to start a new sequence. If yes, use those up.
- If neither is possible, splitting is impossible.

This greedy approach ensures all subsequences are consecutive and length ≥ 3.

### Corner cases to consider  
- Empty array input (`[]`).
- Arrays with less than 3 numbers (can't form a valid subsequence).
- Arrays where all elements are the same.
- Arrays with gaps (such as `[1,3,5,7]`).
- Many short subsequences but not enough numbers to extend any to length 3.

### Solution

```python
def isPossible(nums):
    # Step 1: Count occurrences of each number
    freq = {}
    for num in nums:
        freq[num] = freq.get(num, 0) + 1

    # Step 2: Track # of subsequences that end at a given value
    append = {}

    for num in nums:
        if freq[num] == 0:
            continue  # Already used
        # Can we append num to an existing subsequence?
        if append.get(num - 1, 0) > 0:
            append[num - 1] -= 1
            append[num] = append.get(num, 0) + 1
            freq[num] -= 1
        # Can we start a new subsequence (num, num+1, num+2)?
        elif freq.get(num + 1, 0) > 0 and freq.get(num + 2, 0) > 0:
            freq[num] -= 1
            freq[num + 1] -= 1
            freq[num + 2] -= 1
            append[num + 2] = append.get(num + 2, 0) + 1
        else:
            return False  # Can't use num as required
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of `nums`. Each number is processed at most once, and hash map operations are O(1) on average.
- **Space Complexity:** O(n), due to storage needed for `freq` and `append` hash maps, which in worst-case have as many keys as the number of unique elements in `nums`.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if subsequences could be of any minimum length (not necessarily 3)?  
  *Hint: Would need to “remember” the minimum sequence length requirement as a parameter.*

- Can you extend this to unsorted input arrays?  
  *Hint: Might need to sort first or maintain order in another way.*

- What if the array is streamed and not given all at once?  
  *Hint: Think about real-time allocation and tracking possible subsequences as numbers arrive.*

### Summary
This problem uses a **greedy** and **hash map tracking** pattern: greedily extend existing sequences or only start new valid ones if possible. This approach is common in substring/subsequence-building problems where global optimality comes from making the best local choice. The use of hash maps to track usage and open subsequences is a pattern that also appears in interval or sequence partitioning tasks.