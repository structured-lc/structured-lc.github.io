### Leetcode 2963 (Hard): Count the Number of Good Partitions [Practice](https://leetcode.com/problems/count-the-number-of-good-partitions)

### Description  
You're given a 0-indexed array of positive integers `nums`.  
You have to partition the array into one or more **contiguous** subarrays such that **no two subarrays contain the same number**.  
Return the number of such **good partitions**.  
As the answer can be large, return it modulo 10⁹+7.

The key:  
- Every value in `nums` must appear entirely within a single partition; otherwise, two partitions would have the same value, which is not allowed.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4]`  
Output: `8`  
*Explanation: All 8 possible partitions (every possible way to split a 4-element array)*  
([1], [2], [3], [4])  
([1], [2], [3,4])  
([1], [2,3], [4])  
([1], [2,3,4])  
([1,2], [3], [4])  
([1,2], [3,4])  
([1,2,3], [4])  
([1,2,3,4])  

**Example 2:**  
Input: `nums = [1,1,1,1]`  
Output: `1`  
*Explanation: All values are the same, so only a single partition ([1,1,1,1]) is possible.*

**Example 3:**  
Input: `nums = [1,2,1,3]`  
Output: `2`  
*Explanation: Two good partitions:  
([1,2,1], [3])  
([1,2,1,3])  
Partition ([1], [2], [1,3]) is **invalid** as the value '1' appears in two partitions.*

### Thought Process (as if you’re the interviewee)  

Let's first think brute-force:  
- We could try all possible partitions (using recursion or backtracking), for each, check that all subarrays are disjoint in value — but this is exponential (2ⁿ⁻¹ possibilities), far too slow for large arrays.

Optimizing:  
- Let's focus on the "no repeats" condition: All occurrences of a value must be grouped within the **same partition**.
- That means for every number, all its occurrences must be within one segment; you can only cut *after* its last appearance and *after* every element before its last appearance is "done".

Efficient approach:  
- For each value, note its **last occurrence**.
- As you iterate, keep a running "current partition's right bound" = max(last occurrence of nums[0..i]).
- Whenever the current index matches that running right bound, a **valid cut point** is found (splitting at this point is safe—the left partition now contains every value it needs, none will be repeated).
- Each valid cut doubles the number of possible partitions (since every cut is optional).
- So: For k cut points, total answer = 2ᵏ (modulo 10⁹+7).

Trade-offs:  
- Scanning the array to build last positions: O(n).
- One more pass for the cut points: O(n).
- Uses O(n) space and is very efficient.

### Corner cases to consider  
- Empty array (should be handled separately, likely return 1 as there is 1 way to partition "nothing").
- Array with all unique numbers (maximum number of partitions).
- Array with all equal values (only one partition is possible).
- Multiple disconnected repeats (e.g., [1,2,1,2,3]).
- Single element array.

### Solution

```python
def countPartitions(nums):
    MOD = 10**9 + 7
    n = len(nums)
    # Step 1: Find last occurrence positions
    last_pos = {}
    for i, num in enumerate(nums):
        last_pos[num] = i

    result = 1 # At least one partition (the whole array)
    curr_max = 0  # Points to the current rightmost last index

    # Step 2: For all places where you can cut (except after the last element)
    for i in range(n - 1):
        curr_max = max(curr_max, last_pos[nums[i]])
        if i == curr_max:
            # Cutting here is allowed: multiply ways by 2
            result = (result * 2) % MOD

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Two passes: one to gather last occurrences, one to scan and process cut points.
- **Space Complexity:** O(n) — Storing the last occurrence of each unique number.

### Potential follow-up questions (as if you’re the interviewer)  

- What if some elements can appear in more than one partition (relax the uniqueness)?  
  *Hint: Consider how you could allow k duplicates globally and whether DP could help.*

- What changes if the array is not contiguous (i.e., elements can be selected into partitions in a non-contiguous way)?  
  *Hint: DP or combinatorics might be required, not just cut point logic.*

- How would you generalize this if values from a *range* are forbidden from being repeated in partitions, not just overall uniqueness?  
  *Hint: Need more general interval/segment tracking.*

### Summary
This problem uses a **greedy/cutting algorithm with last occurrence tracking**, a classic way to enforce value constraints over segments. It relates to patterns like "partition labels" or "merge intervals" and is often useful in problems requiring unique element handling over subarrays. Recognizing the key constraint (all occurrences grouped) enables an O(n) solution.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Combinatorics(#combinatorics)

### Similar Problems
- Check if There is a Valid Partition For The Array(check-if-there-is-a-valid-partition-for-the-array) (Medium)