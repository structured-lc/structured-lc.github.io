### Leetcode 2524 (Hard): Maximum Frequency Score of a Subarray [Practice](https://leetcode.com/problems/maximum-frequency-score-of-a-subarray)  

### Description  
Given an array of integers `nums` and an integer `k`, find the maximum **frequency score** among all contiguous subarrays of length `k`.  
- The **frequency score** for a subarray is defined as the sum, over each unique value in the subarray, of the value raised to the power of its frequency within the subarray.  
- Formally: For each unique value x in the subarray, let freq(x) be its count. Then add up x^(freq(x)) for all x. Return the result modulo 10⁹+7.  
- Return the maximum such score for any length-`k` contiguous window.  

### Examples  

**Example 1:**  
Input: `nums = [1,1,1,2,1,2]`, `k = 3`  
Output: `5`  
*Explanation: Consider subarrays of length 3:  
- [1,1,1]: 1 appears 3 times → 1³ = 1  
- [1,1,2]: 1 appears 2, 2 appears 1 → 1² + 2¹ = 1 + 2 = 3  
- [1,2,1]: 1 appears 2, 2 appears 1 → 1² + 2¹ = 1 + 2 = 3  
- [2,1,2]: 2 appears 2, 1 appears 1 → 2² + 1¹ = 4 + 1 = 5  
- [1,2,1]: 1² + 2¹ = 3  
- [2,1,2]: 2² + 1¹ = 5  
Maximum is 5.*

**Example 2:**  
Input: `nums = [1,1,1,1,1,1]`, `k = 4`  
Output: `1`  
*Explanation: Every window has 1⁴ = 1 as the score.*

**Example 3:**  
Input: `nums = [5,4,5,7,4,4]`, `k = 6`  
Output: `96`  
*Explanation: Only window is entire array:  
4 appears 3 times → 4³ = 64  
5 appears 2 times → 5² = 25  
7 appears 1 time → 7¹ = 7  
64 + 25 + 7 = 96*  

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every possible subarray of size k. For each, count frequencies, raise each distinct number x to its freq(x), sum, take max. O(nk) time. Not feasible for n up to 10⁵.
- **Optimization:**  
  - Use a sliding window of length k and maintain a frequency map.
  - As window slides, decrement frequency of outgoing element, increment frequency of incoming.
  - To avoid full recomputation, try to update the score by removing outgoing x^{old_f} and adding x^{new_f}, for only those elements whose frequency changes in the window.
  - Since there may be up to 10⁶ possible values for x, but in any window of size k there’ll be ≤k unique x, so per window update is O(k) in naive approach.
  - Using a dictionary for freq map: O(nk) if fully recompute each time. Goal: O(n log k) or better.
  - Use a second dictionary to store x^{freq(x)} for current freq, update as x enters/exits the window.

- **Trade-offs:**  
  - Full recomputation per window is too slow.  
  - Fastest is to use the fact that only two array entries (at both window ends) change at each slide. We can update their contribution individually, so overall O(nk) in worst, but can be O(n) for small unique values.

### Corner cases to consider  
- Empty array or k = 0 (invalid input – but per constraints, k ≥ 1)  
- All elements are equal (score is always that element\*\*k)  
- All elements are unique  
- Window size equals array size  
- Large numbers in nums (watch for overflow; use modulo everywhere)  
- Values in nums being 1 (1¹ = 1 no matter frequency)  
- k = 1 (maximum element is answer)

### Solution

```python
def maxFrequencyScore(nums, k):
    MOD = 10**9 + 7

    from collections import defaultdict

    n = len(nums)
    freq = defaultdict(int)  # frequency of each number in window
    pow_map = {}             # cache for x^{freq} results

    def fast_pow(x, power):
        """Efficiently compute x^power % MOD (binary exponentiation)."""
        res = 1
        while power:
            if power % 2 == 1:
                res = res * x % MOD
            x = x * x % MOD
            power //= 2
        return res

    score = 0
    # Compute initial window
    for i in range(k):
        num = nums[i]
        freq[num] += 1

    # Precompute powers and compute the initial window score
    for x, f in freq.items():
        val = fast_pow(x, f)
        score = (score + val) % MOD

    max_score = score

    for i in range(k, n):
        out = nums[i - k]
        in_ = nums[i]

        # Remove out's previous contribution
        score = (score - fast_pow(out, freq[out])) % MOD
        freq[out] -= 1
        if freq[out] > 0:
            score = (score + fast_pow(out, freq[out])) % MOD
        else:
            del freq[out]  # removed completely

        # Add in_'s new contribution
        prev_freq = freq[in_]
        if prev_freq > 0:
            score = (score - fast_pow(in_, prev_freq)) % MOD
        freq[in_] += 1
        score = (score + fast_pow(in_, freq[in_])) % MOD

        max_score = max(max_score, score)

    return max_score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log k) worst case (per window: each update is mostly O(log k) for large k due to pow, and each window slides over n - k times).
- **Space Complexity:** O(k) for the frequency dictionary (since window size is k), plus O(1) auxiliary for the pow function.

### Potential follow-up questions (as if you’re the interviewer)  

- What if k could be as large as n (up to 10⁵) and you must process many queries for various k values?
  *Hint: Can you precompute subarray powers or frequency tables efficiently?*

- How would you handle frequent queries of this type online (add/delete number, always keep max freq score at size k)?
  *Hint: Consider using segment trees or other advanced data structures.*

- Suppose the definition of "frequency score" used a different formula, like summing freq(x) × x instead of x^{freq(x)}. How would you change your approach?
  *Hint: Would updating the sliding window become easier or harder?*

### Summary
This problem uses the **sliding window with frequency dictionary** pattern, but with challenging updates: each window's score depends non-linearly on both value and frequency, so you must update contributions for outgoing/incoming elements by subtracting and adding the correct powered values.  
The modular exponentiation technique (binary exponentiation) is necessary to efficiently compute large exponents under modulo.  
This technique/general approach is common for problems involving **windowed aggregations with dynamic frequency-based computations** (such as most frequent element in window, windowed power sums, etc).

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Stack(#stack), Sliding Window(#sliding-window)

### Similar Problems
