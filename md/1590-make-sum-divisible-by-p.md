### Leetcode 1590 (Medium): Make Sum Divisible by P [Practice](https://leetcode.com/problems/make-sum-divisible-by-p)

### Description  
You are given an array of positive integers and an integer p. Your task is to remove the **smallest subarray** (a contiguous block, possibly empty but not the whole array) from the array so that the sum of the remaining elements is divisible by p. If it's impossible, return -1. Return the length of the smallest subarray you must remove.

### Examples  

**Example 1:**  
Input: `nums = [3,1,4,2]`, `p = 6`  
Output: `1`  
*Explanation: The sum is 10. 10 mod 6 = 4. Remove subarray [4] (nums[2]) → remaining sum is 6, which is divisible by 6.*

**Example 2:**  
Input: `nums = [6,3,5,2]`, `p = 9`  
Output: `2`  
*Explanation: The sum is 16. 16 mod 9 = 7. Remove subarray [5,2] (nums[2:4]) → remaining sum is 9, divisible by 9.*

**Example 3:**  
Input: `nums = [1,2,3]`, `p = 3`  
Output: `0`  
*Explanation: The sum is 6, which is already divisible by 3. No need to remove anything.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every possible subarray, compute sum after removal, check divisibility. This is O(n²), and too slow for constraints.
- **Optimized:** Notice we want to find the _smallest_ subarray whose sum modulo p is the same as the remainder `r = total_sum % p`. If we remove such a subarray, the total sum becomes divisible by p.
- Use **prefix sums** and a **hashmap**: For every index, track `(prefix_sum % p)`. For each prefix, look for another prefix j (possibly earlier) where `(current_prefix_sum - prev_prefix_sum) % p == r`.
- This reduces the problem to O(n) time using prefix sums and a hash map to store the latest index for each prefix sum % p.

### Corner cases to consider  
- Array where the sum is already divisible by p (should return 0).
- No possible subarray can be removed (should return -1).
- Subarray to remove is at the start or end.
- The required subarray would be the whole array (not allowed).
- p is larger than the total sum.
- Array of length 1.

### Solution

```python
def minSubarray(nums, p):
    total = sum(nums)
    remainder = total % p
    if remainder == 0:
        return 0  # No need to remove anything

    # Map stores prefix_mod: index, so we can check matching subarrays quickly
    prefix_mod_map = {0: -1}  # base case
    prefix_sum = 0
    res = len(nums)

    for i, num in enumerate(nums):
        prefix_sum = (prefix_sum + num) % p
        # Want prev_mod so that (curr_prefix - prev_prefix) % p == remainder
        # => prev_prefix % p == (prefix_sum - remainder + p) % p
        target = (prefix_sum - remainder + p) % p
        if target in prefix_mod_map:
            res = min(res, i - prefix_mod_map[target])
        prefix_mod_map[prefix_sum] = i

    return res if res < len(nums) else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we traverse the array once and each hashmap operation is O(1).
- **Space Complexity:** O(p) or O(n) in worst-case (if all prefix_mods are unique), for storing prefix_mod_map.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were allowed to remove a non-contiguous set of elements?  
  *Hint: Consider subset sum or DP approaches instead of prefix sums.*

- Can you generalize this to multidimensional arrays (matrices)?  
  *Hint: Prefix sum ideas can extend to 2D, but subarray constraints become more complex.*

- How would you handle negative numbers in nums?  
  *Hint: Modulo operations with negatives can behave unexpectedly; careful normalization needed.*

### Summary
This approach uses the **prefix sum and hashmap** pattern, a classic and efficient way to solve subarray sum or remainder problems involving divisibility or modular arithmetic. It is widely used in problems where you need to find subarrays with certain sum constraints in linear time. The core insight here is reducing the problem to finding the shortest subarray whose sum mod p equals the remainder we need to cancel out.


### Flashcard
Find the smallest subarray whose sum mod p equals total_sum mod p; use prefix sums and a hashmap for O(n) time.

### Tags
Array(#array), Hash Table(#hash-table), Prefix Sum(#prefix-sum)

### Similar Problems
- Subarray Sums Divisible by K(subarray-sums-divisible-by-k) (Medium)
- Find the Divisibility Array of a String(find-the-divisibility-array-of-a-string) (Medium)