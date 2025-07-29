### Leetcode 1121 (Hard): Divide Array Into Increasing Sequences [Practice](https://leetcode.com/problems/divide-array-into-increasing-sequences)

### Description  
Given a sorted array `nums` (non-decreasing order, possible duplicates) and an integer `k`, **determine if you can split the array into one or more disjoint, strictly increasing subsequences**, each of length at least `k`.  
A subsequence is formed by deleting some (or no) elements without changing the order of the remaining elements. Sub-sequences must be disjoint and each must be strictly increasing.  
Return `True` if possible, else `False`.

### Examples  

**Example 1:**  
Input: `nums = [1,2,2,3,3,4,4]`, `k = 3`  
Output: `True`  
*Explanation: One possible partition is [1,2,3,4] and [2,3,4]. Each subsequence is increasing and has at least length 3.*

**Example 2:**  
Input: `nums = [5,6,6,7,8]`, `k = 3`  
Output: `False`  
*Explanation: Any strictly increasing subsequence must separate duplicate '6's, and there are not enough elements to create two increasing subsequences of length at least 3.*

**Example 3:**  
Input: `nums = [1,1,2,2,3,3,4,4]`, `k = 4`  
Output: `True`  
*Explanation: You can split as [1,2,3,4] and [1,2,3,4]. Both are strictly increasing and of length ≥ 4.*

### Thought Process (as if you’re the interviewee)  
- Since the array is sorted, the only obstacle to forming a strictly increasing sequence is the presence of duplicate numbers.
- Each duplicate forces us to split sequences so that no subsequence contains two copies of the same number.
- For the most frequent number in `nums`, say it appears `maxFreq` times, there must be at least `maxFreq` disjoint subsequences, since each copy must be in its own subsequence.
- Each subsequence must be at least length `k`, so we must have at least `maxFreq × k ≤ n` (where `n` is total number of elements) for it to be possible.
- So:  
    1. Count frequency of each number; find the maximum frequency.
    2. Check if `maxFreq × k ≤ n`. If yes, return True; otherwise, False.  
- This approach is **greedy** and optimal due to the sorted property and the strict increasing condition.

### Corner cases to consider  
- Empty array? (Not possible per constraints: always at least 1 element.)
- `k > n`: Impossible.
- All elements the same. (Impossible when `k > 1`.)
- Large `n`, but low `k`.
- Only one element with `k = 1`.
- All unique elements (no duplicates).

### Solution

```python
def canDivideIntoSubsequences(nums, k):
    # Count the maximum frequency of any number
    prev = nums[0]
    freq = max_freq = 1
    
    for x in nums[1:]:
        if x == prev:
            freq += 1
        else:
            max_freq = max(max_freq, freq)
            prev = x
            freq = 1
            
    max_freq = max(max_freq, freq)  # last number
    
    # If there are not enough elements to make max_freq sequences of length at least k, return False
    return max_freq * k <= len(nums)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n):  
  One pass to count the frequencies; rest are simple arithmetic.
- **Space Complexity:** O(1):  
  Only a few integer variables; no extra data structures used, since array is sorted.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it if the input was **not** sorted?  
  *Hint: You'd need to sort first, or use a multiset/data structure to simulate subsequence construction.*

- What if the subsequences could be **not strictly increasing** (i.e., allow duplicates within a subsequence)?  
  *Hint: The main constraint (max frequency) may change; explain why.*

- What changes if instead of returning True/False, you had to actually **return the subsequences**?  
  *Hint: Use `max_freq` queues and build sequences using a round-robin approach.*

### Summary
This problem uses a **greedy frequency counting** pattern, exploiting the fact that duplicates force splits into separate sequences. It’s common in problems involving subsequence partitioning and grouping by occurrence constraints, especially when input is sorted and strict order is required. Variants appear in interval scheduling and sequencing tasks.