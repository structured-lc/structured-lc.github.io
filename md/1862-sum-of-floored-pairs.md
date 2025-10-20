### Leetcode 1862 (Hard): Sum of Floored Pairs [Practice](https://leetcode.com/problems/sum-of-floored-pairs)

### Description  
Given an integer array **nums**, return the sum of floored pairs: for every pair (i, j) where 0 ≤ i, j < n, calculate sum(floor(nums[i] / nums[j])). The answer should be given modulo 10⁹+7.

More simply, for every ordered pair of elements (including when i = j), return the total of floor-division results.

### Examples  

**Example 1:**  
Input: `nums = [2,5,9]`  
Output: `10`  
*Explanation: All pairs:  
2//2 = 1, 2//5 = 0, 2//9 = 0  
5//2 = 2, 5//5 = 1, 5//9 = 0  
9//2 = 4, 9//5 = 1, 9//9 = 1  
Sum: 1+0+0+2+1+0+4+1+1 = 10*

**Example 2:**  
Input: `nums = [7,7,7,7,7,7,7]`  
Output: `49`  
*Explanation: Every pair yields 1 (since 7//7=1), and there are 7²=49 pairs.*

**Example 3:**  
Input: `nums = [1]`  
Output: `1`  
*Explanation: Only one pair: 1//1 = 1*


### Thought Process (as if you’re the interviewee)  

First, notice brute force checks every pair, doing floor-division n² times. That is too slow for n up to 10⁵.

Thinking deeper, notice floor(x/y) increments by 1 when y crosses x/(k+1) to x/k for each k in [1, x]. So we can use frequency counting across the value range.

Let m = max(nums).  
- Make a frequency array freq[i] for value i in nums  
- Make prefix sums to enable counting, so prefix[i] = number of elements ≤ i

For each unique denominator y, for each integer k ≥ 1, count numerators x such that floor(x/y) = k:

- x in [y*k, y*(k+1) - 1]
- Count number of x in this range using prefix sums
- Multiply this count by k × frequency of y (denominator)

Sum for all y and k.

This reduces overall operations from O(n²) to about O(n log m) or slightly more, which is feasible.

### Corner cases to consider  
- All elements are the same (e.g., [7,7,...,7])
- Only one element (e.g., [1])
- Elements with large gaps (e.g., [1,100000])
- Duplicates
- Very large input range (max(nums) = 10⁵)
- nums contains 1 (division by 1)


### Solution

```python
def sumOfFlooredPairs(nums):
    MOD = 10**9 + 7
    max_num = max(nums)
    freq = [0] * (max_num + 2)   # make room for prefix up to max_num + 1
    
    # Frequency count
    for num in nums:
        freq[num] += 1
        
    # Prefix sum
    prefix = [0] * (max_num + 2)
    for i in range(1, max_num + 2):
        prefix[i] = prefix[i-1] + freq[i]
        
    result = 0
    # for each possible denominator y
    for y in range(1, max_num + 1):
        if freq[y] == 0:
            continue
        # check for all k: y*k in nums
        k = 1
        while y * k <= max_num:
            left = y * k
            right = min(y * (k + 1) - 1, max_num)
            # count of numerators in [left, right]
            count = prefix[right] - prefix[left - 1]
            result = (result + freq[y] * count * k) % MOD
            k += 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m log m), where m = max(nums). For each y (at most m), inner loop runs up to log m times as y*k ≤ m.  
- **Space Complexity:** O(m), due to frequency and prefix sum arrays sized by max_num.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want the sum for only unique pairs (i ≠ j)?  
  *Hint: Subtract diagonal (i = j) terms.*

- How would you modify it to return not only the sum but a list of all floored results for each pair?  
  *Hint: Output n² array—would be infeasible for large n!*

- Can this approach be adapted if nums was not integer-valued?  
  *Hint: No—you crucially use buckets & prefix sums by integer value.*

### Summary
This problem uses **value-bucketing**, **prefix sums**, and careful arithmetic to efficiently compute aggregate results over all pairs in an array, replacing brute-force enumeration. The approach is similar to the "range sum" and "bucket counting" patterns and can be useful in other problems involving counting or summing specific relations between all pairs in dense input arrays.


### Flashcard
Use frequency counting and prefix sums to efficiently compute the sum of floored pairs.

### Tags
Array(#array), Math(#math), Binary Search(#binary-search), Prefix Sum(#prefix-sum)

### Similar Problems
