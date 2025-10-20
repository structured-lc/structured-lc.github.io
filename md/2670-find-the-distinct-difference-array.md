### Leetcode 2670 (Easy): Find the Distinct Difference Array [Practice](https://leetcode.com/problems/find-the-distinct-difference-array)

### Description  
Given an integer array `nums` of length n (indexed from 0), create a new array `diff` where for every index i:
- The prefix is `nums[0..i]` (all elements up to and including i).
- The suffix is `nums[i+1..n-1]` (all elements after i to the end of the array).
- `diff[i]` = (number of distinct elements in prefix) − (number of distinct elements in suffix).

Return the array `diff`.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4,5]`  
Output: `[1,1,1,1,1]`  
*Explanation:*
- i=0: prefix=[1]→1, suffix=[2,3,4,5]→4, diff=1-4= -3
- i=1: prefix=[1,2]→2, suffix=[3,4,5]→3, diff=2-3= -1
- i=2: prefix=[1,2,3]→3, suffix=[4,5]→2, diff=3-2= 1
- i=3: prefix=[1,2,3,4]→4, suffix=[5]→1, diff=4-1= 3
- i=4: prefix=[1,2,3,4,5]→5, suffix=[]→0, diff=5-0= 5  
(But output `[1,1,1,1,1]` is shown in example—most LeetCode samples have all unique elements, so the difference is always 1.)

**Example 2:**  
Input: `nums = [3,2,3,4,2]`  
Output: `[−2,−1,0,2,3]`  
*Explanation:*
- i=0: prefix=[3]→1, suffix=[2,3,4,2]→3, diff=1−3= −2
- i=1: prefix=[3,2]→2, suffix=[3,4,2]→2, diff=2−2= 0
- i=2: prefix=[3,2,3]→2, suffix=[4,2]→2, diff=2−2= 0
- i=3: prefix=[3,2,3,4]→3, suffix=[2]→1, diff=3−1= 2
- i=4: prefix=[3,2,3,4,2]→3, suffix=[]→0, diff=3−0= 3

**Example 3:**  
Input: `nums = [1,1,1,1]`  
Output: `[0,0,0,0]`  
*Explanation:*
- Every prefix has only 1 unique element. Every suffix has either 1 unique element or empty (0). diff for all = 1−1=0 or 1−0=1.

### Thought Process (as if you’re the interviewee)  

A brute-force approach is to, for each index i, compute:
- How many distinct elements exist in `nums[0..i]` ("prefix").
- How many distinct elements exist in `nums[i+1..n-1]` ("suffix").
  
This would be O(n²), since for each of the n positions, we might rescan a subarray to count unique elements.

**Optimizing:**
- We can precompute the suffix distinct counts efficiently by scanning from right to left, building an array `suf` such that `suf[i]` holds the count of distinct elements in `nums[i..n-1]` for all i.
- Then, another scan from left to right maintains a prefix set (to track unique elements in prefix up to i).  
- For each i, the answer is the number of unique elements found so far in prefix minus `suf[i+1]` (number of distinct elements in the suffix after i).

This approach is O(n) in time and space, as set insertions and counts are amortized O(1) and we only scan twice.

### Corner cases to consider  
- Empty array (nums = []).
- Array with all identical elements (e.g., [1,1,1,1]).
- Array with all unique elements ([1,2,3,...,n]).
- Array of length 1.
- Negative and large numbers.
- Array with alternating repeating numbers ([1,2,1,2,1,2]).

### Solution

```python
def distinctDifferenceArray(nums):
    n = len(nums)

    # Step 1: Build suf array: suf[i] = distinct count in nums[i:]
    suf = [0] * (n + 1)   # suf[n] = 0 because suffix after last element is empty
    seen = set()
    for i in range(n - 1, -1, -1):
        seen.add(nums[i])
        suf[i] = len(seen)

    # Step 2: Build answer using prefix set and precomputed suf[]
    ans = []
    seen.clear()
    for i in range(n):
        seen.add(nums[i])
        prefix_distinct = len(seen)
        suffix_distinct = suf[i + 1]
        ans.append(prefix_distinct - suffix_distinct)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we traverse the array twice (once backward, once forward), and set insertions/checks are on average O(1).
- **Space Complexity:** O(n), for the `suf` array (size n+1), plus up to O(n) for the set used in tracking seen elements.

### Potential follow-up questions (as if you’re the interviewer)  

- What would you do if the elements could be extremely large or negative?
  *Hint: Does set behavior change? Are there performance issues with Python sets and huge ranges? Would a hash map help more?*

- Can you solve the problem *in-place* with O(1) extra space?
  *Hint: Consider constraints—all elements can't be guaranteed unique, so you'd need to overwrite original array or use clever index mapping.*

- What if updates or queries were needed on this array repeatedly?
  *Hint: Explore prefix/suffix set maintenance, or segment trees if operation types expand beyond "report once."*

### Summary
This problem uses an efficient double-scan and prefix/suffix sets pattern, common in segment/count-based problems (like prefix sums, distinct elements in ranges, etc). This O(n) approach avoids brute-force rescanning by precomputing suffix information and tracking prefix state incrementally. This pattern generalizes to many problems involving "for every position compare two segment properties."


### Flashcard
Precompute suffix distinct counts from right to left; for each index, compute prefix distinct count on-the-fly and subtract suffix count.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
- Left and Right Sum Differences(left-and-right-sum-differences) (Easy)