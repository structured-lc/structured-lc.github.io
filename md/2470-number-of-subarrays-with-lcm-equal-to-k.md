### Leetcode 2470 (Medium): Number of Subarrays With LCM Equal to K [Practice](https://leetcode.com/problems/number-of-subarrays-with-lcm-equal-to-k)

### Description  
Given an array of integers `nums` and an integer `k`, find the number of contiguous subarrays where the least common multiple (LCM) of all elements in the subarray equals `k`.  
- A *subarray* is any contiguous section of the original array.
- The LCM of a list is the smallest positive integer divisible by all numbers in the list.

### Examples  

**Example 1:**  
Input: `nums = [3,6,2,7,1], k = 6`  
Output: `4`  
*Explanation: The valid subarrays are: , [3,6], [6,2], [6,2,7]. Each has LCM = 6. For example, [3,6] → LCM(3,6) = 6.*

**Example 2:**  
Input: `nums = [1,2,3], k = 6`  
Output: `2`  
*Explanation: The valid subarrays are: [2,3], [1,2,3]. Both have LCM = 6 ([2,3] → 6, [1,2,3] → 6).*

**Example 3:**  
Input: `nums = [4, 5, 10, 20], k = 20`  
Output: `3`  
*Explanation: The valid subarrays are: , [10,20], and [5,10,20] (each with LCM = 20).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**:  
  For each possible subarray (`O(n²)`), compute the LCM of all its elements. If the LCM equals `k`, increment the answer.  
  This is slow (`O(n² × log(max_value))`) but works for small arrays.

- **Optimization**:  
  Note that the LCM only increases (or remains the same) as we extend the subarray.  
  If at any point the running LCM exceeds `k` or is not a divisor of `k`, we can break early.  
  There’s no need to consider subarrays whose starting element isn’t a divisor of `k` (because their LCM can never become exactly `k`).

- The best clean solution is to iterate with two loops: for each starting index, iterate rightward, maintaining a running LCM and counting when it matches `k`.

- **Why stick with this approach?**  
  - The running LCM helps to short-circuit unnecessary work.
  - No shortcuts with hash maps or prefix tricks, because LCM over range is not invertible or associative in a way that enables such tricks.

### Corner cases to consider  
- Input array is empty (`nums = []`)
- `k` is not present and not a multiple of any number in `nums`
- All elements equal to `k`
- Single-element arrays, where element is `k` or different from `k`
- Elements larger than `k`
- Elements are factors of `k` but never combine to `k`
- Duplicate numbers in the array

### Solution

```python
def subarrayLCM(nums, k):
    def lcm(a, b):
        # Compute greatest common divisor (GCD)
        while b:
            a, b = b, a % b
        return a
    
    def calc_lcm(a, b):
        # Least common multiple (LCM) via GCD
        return abs(a * b) // lcm(a, b)
    
    n = len(nums)
    count = 0
    for i in range(n):
        current = nums[i]
        if k % current != 0:  # Skip if not a factor of k
            continue
        if current == k:
            count += 1
        for j in range(i + 1, n):
            current = calc_lcm(current, nums[j])
            if current > k or k % current != 0:
                break
            if current == k:
                count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × log(k)).  
  Two loops for all subarrays. For each, LCM calculation is O(log(k)) due to GCD operations. The early exit reduces practical number of iterations.

- **Space Complexity:** O(1).  
  Only a fixed number of variables for computation, no extra storage proportional to input or recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- If `nums` is very large (e.g., 10⁵+), can you do better than O(n²)?
  *Hint: Is there any range-aggregation trick for LCM like for GCD or sum?*

- How would your answer change if the question asked for subarrays where the GCD equals `k` instead of LCM?
  *Hint: GCD is associative in a way that allows prefix/suffix optimization. LCM is not.*

- Could you efficiently handle queries, e.g., given multiple values of k for the same nums?
  *Hint: Preprocessing with factorization or segment trees?*

### Summary
This problem is a classic example of the **enumerate all subarrays** pattern, applying a running aggregation (LCM) with early exit optimization.  
Unlike the sum or GCD, the LCM does not have convenient invertibility, so prefix/suffix tricks don't work—thus, a two-loops approach is optimal up to moderate size.  
The pattern applies to similar range-query problems where the operation isn't easily decomposed or recombined.

### Tags
Array(#array), Math(#math), Number Theory(#number-theory)

### Similar Problems
- Number of Subarrays With GCD Equal to K(number-of-subarrays-with-gcd-equal-to-k) (Medium)