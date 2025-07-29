### Leetcode 532 (Medium): K-diff Pairs in an Array [Practice](https://leetcode.com/problems/k-diff-pairs-in-an-array)

### Description  
Given an integer array **nums** and an integer **k**, you need to find the number of **unique** k-diff pairs in the array.  
A k-diff pair is a pair of integers (i, j), where both numbers are from the array and their absolute difference is exactly **k**.  
The pair should be **unique**; (a, b) is the same as (b, a), and index order within the array does not matter.

### Examples  

**Example 1:**  
Input: `nums = [3,1,4,1,5], k = 2`  
Output: `2`  
*Explanation: There are two unique pairs with an absolute difference of 2: (1,3) and (3,5).*

**Example 2:**  
Input: `nums = [1,2,3,4], k = 1`  
Output: `3`  
*Explanation: Unique pairs: (1,2), (2,3), (3,4).*

**Example 3:**  
Input: `nums = [1,1,1,1,1], k = 0`  
Output: `1`  
*Explanation: Only one unique pair: (1,1), as repeated values count only once for k = 0.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Check every possible pair (i, j) with i < j, check if abs(nums[i] - nums[j]) == k, and keep a set to avoid duplicate pairs.  
  Time complexity: O(n²). Too slow for n up to 10⁴.

- **Optimize using a hash map:**  
  - For k > 0:  
    - Count each unique number only once.  
    - Use a set for fast lookups: for each unique number x, check if x + k is in the array.  
  - For k == 0:  
    - We look for duplicates of the same number—count how many numbers occur at least twice.
  - Using sets guarantees uniqueness.

- **Final approach:**  
  - If k < 0, answer is 0 (difference negative not possible).
  - If k == 0: Count numbers appearing at least twice.
  - If k > 0: Count numbers x where x + k is also in the array.

### Corner cases to consider  
- **Empty array**  
- **k = 0** (exact duplicates, only count each number once)  
- **k < 0** (never possible, answer is always 0)  
- All numbers are the same  
- No valid pairs exist  
- Large k (no possible pairs)  
- Only two elements in array

### Solution

```python
def findPairs(nums, k):
    # For k < 0, absolute difference can't be negative
    if k < 0:
        return 0

    from collections import Counter

    count = 0
    nums_count = Counter(nums)

    if k == 0:
        # For k == 0, count unique elements with freq >= 2
        for v in nums_count.values():
            if v > 1:
                count += 1
    else:
        # For k > 0, look for x and x+k (unique x only)
        for num in nums_count:
            if num + k in nums_count:
                count += 1

    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we build a frequency map and check for existence of each required pair in O(1) via hashing.
- **Space Complexity:** O(n), for the extra space used in the hash map.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to output the actual pairs, not just count them?  
  *Hint: Use a set of tuples to record pairs as you collect them.*

- What if the array is sorted? Can you do better with two pointers?  
  *Hint: Sliding two pointers allows checking for differences without extra space.*

- If the array is immutable and many queries are issued for various k, can you preprocess to answer in O(1) per query?  
  *Hint: Store a precomputed set for all possible k up to the max difference.*

### Summary
This problem is an application of the **hash set/hash map** pattern for fast unique pair lookups, related to the **Two Sum** problem. The approach efficiently counts unique pairs in O(n) time and is often used in problems involving unique value detection or recording element frequencies. The techniques here are widely applicable for problems requiring uniqueness constraints and difference calculations in arrays.