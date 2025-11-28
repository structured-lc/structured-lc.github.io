### Leetcode 3046 (Easy): Split the Array [Practice](https://leetcode.com/problems/split-the-array)

### Description  
Given an integer array `nums` of **even** length, split it into two subarrays (`nums1`, `nums2`) such that:
- Both arrays have length ⌊n/2⌋, where n is the length of `nums`.
- **All elements** in `nums1` are distinct, and **all elements** in `nums2` are distinct.
  
Return `True` if such a split is possible, otherwise return `False`.  
The key is that in both halves, each number must appear at most once (i.e., no repeats within a half).

### Examples  

**Example 1:**  
Input: `[1,1,2,2,3,4]`,  
Output: `True`  
*Explanation: You can choose nums1 = [1,2,3], nums2 = [1,2,4]. Both halves have only distinct elements.*

**Example 2:**  
Input: `[1,1,1,1]`,  
Output: `False`  
*Explanation: Only way is [1,1] and [1,1], but both contain repeated 1’s. Not possible to make both halves distinct.*

**Example 3:**  
Input: `[5,6,7,8]`,  
Output: `True`  
*Explanation: nums1 = [5,6], nums2 = [7,8] are both distinct.*

### Thought Process (as if you’re the interviewee)  
To solve this problem:

- **Brute-force idea:** Try all possible ways to split the array into two equal halves and check if both are made of distinct elements. This is computationally infeasible as the number of splits grows rapidly with array size.
- **Observation & Optimization:** 
    - Each number can be placed in either half.
    - However, if any number appears more than twice, it’s impossible to keep both halves distinct: no matter how you assign, at least one half will have repeated numbers.
    - Therefore, the core check is: **for each number, its count should be ≤ 2.**
- **Why this works:** Since both halves have no repeats, but we can use each value up to two times (once in each half), so max frequency for any value must be ≤ 2.
- **Space/Time trade-off:** Using a simple count for each value is optimal and avoids brute-force enumeration.

### Corner cases to consider  
- Empty array (not possible per constraints, as minimum length is 1 and always even)
- Array of all identical elements (like `[2,2,2,2]`): should return False if frequency > 2.
- Array with all unique elements (e.g., `[1,2,3,4]`): should always return True.
- Array with exactly two of each value (e.g., `[5,5,6,6]`): should return True.

### Solution

```python
def is_possible_to_split(nums):
    # Dictionary to count frequency of each number
    freq = {}
    for num in nums:
        if num in freq:
            freq[num] += 1
        else:
            freq[num] = 1

    # If any number occurs more than twice, impossible to split
    for count in freq.values():
        if count > 2:
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the array size.
    - We scan the array once to count frequencies, and once to verify the constraint.
- **Space Complexity:** O(1) (since the number range is fixed, max 100 keys), or O(k) where k is the number of unique values.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums can contain more than 100 unique values?
  *Hint: Would you use a different kind of map?*

- What if the split lengths are not necessarily equal?
  *Hint: Would you update the frequency constraint?*

- Can you generate at least one possible valid split, not just check if it exists?
  *Hint: Try greedy assignment as you iterate frequencies.*

### Summary
This approach uses the **hash map frequency counting** pattern and a key **pigeonhole principle** insight: for distinct halves, each value must appear at most twice (once per half). Frequency maps and count-checks are a common coding pattern—seen often in array partitioning, grouping problems, and constructing distinct sets.


### Flashcard
If any number appears > 2 times, impossible; otherwise, use backtracking/DP to check if valid split exists.

### Tags
Array(#array), Hash Table(#hash-table), Counting(#counting)

### Similar Problems
