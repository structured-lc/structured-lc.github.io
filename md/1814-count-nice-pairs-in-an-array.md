### Leetcode 1814 (Medium): Count Nice Pairs in an Array [Practice](https://leetcode.com/problems/count-nice-pairs-in-an-array)

### Description  
Given an array of non-negative integers nums, we call a pair of indices (i, j) a "nice pair" if:
nums[i] + rev(nums[j]) == nums[j] + rev(nums[i]), for 0 ≤ i < j < n,  
where rev(x) means reversing the digits of x (e.g., rev(123) = 321, rev(120) = 21).  
Return the total number of nice pairs modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `nums = [42,11,1,97]`  
Output: `2`  
*Explanation: There are 2 nice pairs: (0,3) and (1,2).
- (0,3): 42 + rev(97) = 42 + 79 = 121; 97 + rev(42) = 97 + 24 = 121
- (1,2): 11 + rev(1) = 11 + 1 = 12; 1 + rev(11) = 1 + 11 = 12*

**Example 2:**  
Input: `nums = [13,10,35,24,76]`  
Output: `4`  
*Explanation: The 4 nice pairs are: (0,2), (0,3), (1,2), (1,3).
For example, (0,2): 13 - rev(13) = 13 - 31 = -18, 35 - rev(35) = 35 - 53 = -18 (same differences)*

**Example 3:**  
Input: `nums = [1]`  
Output: `0`  
*Explanation: Only one element, so no valid pairs.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force Idea:**  
  Consider each pair (i, j) with i < j and check if nums[i] + rev(nums[j]) == nums[j] + rev(nums[i]).  
  For large arrays, this O(n²) approach is too slow.

- **Rearrange the Equation:**  
  Rearranging, we get: nums[i] - rev(nums[i]) == nums[j] - rev(nums[j]).  
  So, for any two indices, if (nums[x] - rev(nums[x])) equals for i and j, then that's a nice pair.

- **Optimal Approach:**  
  - Compute key = nums[i] - rev(nums[i]) for each index i.
  - Count frequency of each key.
  - If a key appears v times, the number of nice pairs is v × (v-1) ÷ 2 (combinatorial pairs).
  - Sum these for all unique keys, return answer modulo 10⁹ + 7.
  - This brings us to O(n) solution with a hash map.

- **Trade-offs:**  
  - Space: Need a hash map to store counts (linear space).
  - Time: Each number processed once; digit reversal is O(1) (logarithmic in number size).

### Corner cases to consider  
- Array with only one element.
- Array with all numbers the same, e.g., [11,11,11,11].
- Palindrome numbers and numbers with trailing zeros.
- Large values (handle reversal and subtraction carefully).
- No nice pairs at all.
- Large array sizes (performance).

### Solution

```python
def countNicePairs(nums):
    MOD = 10**9 + 7

    def reverse(x):
        res = 0
        while x > 0:
            res = res * 10 + x % 10
            x //= 10
        return res

    count = {}  # key: nums[i] - rev(nums[i]), value: frequency
    result = 0

    for num in nums:
        key = num - reverse(num)
        if key in count:
            result = (result + count[key]) % MOD  # add new pairs formed
            count[key] += 1
        else:
            count[key] = 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n \* k), where n = len(nums) and k is the average digit count in nums, as each number's digits need to be reversed.
- **Space Complexity:** O(n), for the hash map storing counts for up to n unique differences.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your algorithm scale if the array is extremely large?
  *Hint: Can you optimize for memory? Can you process pairs in a single pass?*
- What if rev(x) is defined differently (e.g., by omitting zeros or other rules)?
  *Hint: How modular is your reversal logic?*
- Can you output the indices of all the nice pairs instead of just the count?
  *Hint: What extra data would need to be tracked? Memory implications?*

### Summary
This approach applies the "hashing for pair differences" pattern. By transforming the original sum condition into a simpler difference, we can use a hash map to count matching differences efficiently.  
This technique (mapping a complex pairwise condition into a single aggregated key) is common in subarray, substring, and sum/pair parity problems and often leads to O(n) solutions for otherwise O(n²) tasks.


### Flashcard
Compute nums[i] − rev(nums[i]) for each element; count pairs using hash map of frequencies where keys match (nC₂ formula per group).

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Counting(#counting)

### Similar Problems
- Number of Pairs of Interchangeable Rectangles(number-of-pairs-of-interchangeable-rectangles) (Medium)
- Count Number of Bad Pairs(count-number-of-bad-pairs) (Medium)
- Number of Pairs Satisfying Inequality(number-of-pairs-satisfying-inequality) (Hard)