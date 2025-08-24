### Leetcode 3659 (Medium): Partition Array Into K-Distinct Groups [Practice](https://leetcode.com/problems/partition-array-into-k-distinct-groups)

### Description  
Given an integer array `nums` and an integer `k`, partition the array into `k` non-empty groups so that no two groups have any element in common and no element is present in more than one group. Each group must contain only **distinct** elements (no duplicates within a group). Return the **minimum possible number of groups** that can be formed if every group must contain all occurrences of a number. In other words, if a number appears `f` times, each occurrence must go in a separate group, and thus the answer is at least the maximum frequency of any number in the array.

### Examples  

**Example 1:**  
Input: `nums = [1,2,2,3,3,3], k = 3`  
Output: `3`  
*Explanation: The number '3' appears three times, which is the highest frequency. You must create at least 3 groups so that every group contains at most one '3', and the rest of the numbers can be distributed as needed.*

**Example 2:**  
Input: `nums = [1,1,1,2,2,2,3,3,3], k = 3`  
Output: `3`  
*Explanation: All numbers occur exactly 3 times. You need at least 3 groups so each group gets exactly one of each number.*

**Example 3:**  
Input: `nums = [1,2,3,4], k = 2`  
Output: `1`  
*Explanation: All numbers are unique. You can partition into 1 group containing all elements.*

### Thought Process (as if you’re the interviewee)  
- First, notice the question: for each number, all its occurrences must be distributed across different groups, and each group can contain **at most one** of each number.
- The **key constraint** is that no group can have two copies of the same number. So, if some number appears, say, 4 times, you need at least 4 groups for all its occurrences.
- This means the **answer is the maximum frequency** of any number in `nums`.  
- Partition is possible in exactly `max_freq` groups. Any extra groups would be unnecessary.
- Brute force might try to actually form all groups, but we observe we only need to find the **maximum frequency** among numbers for the answer, which can be done efficiently with a single pass to count frequencies.
- Edge: If `k < max_freq`, partition isn't possible; but as per description, `k` is at least `max_freq`.

### Corner cases to consider  
- Empty array (`nums = []`).  
- All unique elements.  
- All identical elements.  
- `k = 1` and variety of elements (multiple duplicates may make it impossible).  
- More groups requested than the length of `nums`.  
- Very large values in `nums`.

### Solution

```python
def minGroups(nums, k):
    # Step 1: Count frequency of each number
    freq = {}
    for num in nums:
        if num not in freq:
            freq[num] = 0
        freq[num] += 1
    
    # Step 2: The answer is the maximum frequency of any value
    max_freq = 0
    for count in freq.values():
        if count > max_freq:
            max_freq = count
    
    # Step 3: At least max_freq groups are needed
    return max_freq
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(nums), because we traverse all elements once to count frequencies, and then traverse the frequency table (which is at most O(n) size).
- **Space Complexity:** O(n) for storing the frequencies (in worst case, all numbers are unique).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to actually construct and return the partitioned groups?
  *Hint: Simulate placing each occurrence round-robin into k lists.*

- What if a group can have at most m distinct elements?  
  *Hint: Greedy placement with group size limits and multisets.*

- What if you are only allowed to form exactly k groups?  
  *Hint: If max_freq > k, not possible; else, can you distribute the numbers evenly?*

### Summary
The approach exploits the **pigeonhole principle**: no two identical elements can occupy the same group, so the answer is the maximum number of times any number appears. This is a classic frequency-counting problem and falls under the **HashMap/Frequency Array + Greedy** pattern, which is common for problems about distributing or grouping with uniqueness/duplicate constraints.

### Tags


### Similar Problems
