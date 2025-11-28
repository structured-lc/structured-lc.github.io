### Leetcode 3589 (Medium): Count Prime-Gap Balanced Subarrays [Practice](https://leetcode.com/problems/count-prime-gap-balanced-subarrays)

### Description  
Given an array of integers `nums` and an integer `k`, **count the number of contiguous subarrays** that:
- Contain **at least two prime numbers**.
- Have the **difference between the maximum and minimum prime number** in the subarray **≤ k**.

Return the total number of such subarrays.  
Think: find all ranges where the set of primes within the subarray are "balanced" (max gap ≤ k) and there are at least two such primes.

### Examples  

**Example 1:**  
Input: `nums = [2, 3, 7, 4, 5], k = 3`  
Output: `4`  
*Explanation:  
The subarrays with at least two primes and max(prime) - min(prime) ≤ 3 are:  
[2, 3], [3, 7], [2, 3, 7], [3, 7, 4, 5] (within each, min & max among primes differ by ≤ 3).*

**Example 2:**  
Input: `nums = [6, 8, 9, 10], k = 2`  
Output: `0`  
*Explanation:  
No subarray contains at least two primes, so answer is 0.*

**Example 3:**  
Input: `nums = [13, 7, 7, 13], k = 0`  
Output: `6`  
*Explanation:  
All subarrays of two or more adjacent 7s or 13s are counted.
[13, 7], [7, 7], [7, 13], [13, 7, 7], [7, 7, 13], [13, 7, 7, 13], each has prime gap 0 or ≤ k.
Repeated primes are okay if max–min gap is still ≤ 0 (which is only possible when all primes are same).*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Try all possible subarrays, extract the primes in each, check if there are at least two and max–min ≤ k. This is O(n² × L), where L is average subarray length.  
  Not feasible for n up to 10⁵.

- **Moving Window/Two Pointers (Optimized):**  
  - Use **Sieve of Eratosthenes** to precompute primality up to max(nums).
  - Use two pointers (left, right) to construct a sliding window.  
  - Maintain a sorted collection (like a multiset) of primes inside current window to **obtain min/max in O(log N)**.
  - Right pointer expands; when there are at least 2 primes and their gap ≤ k, count subarrays ending at right.
  - If not valid, increment left to shrink window.
  - Time complexity: O(n log n), since each element is inserted/removed from multiset at most once and each operation is log N.

- **Why choose this?**  
  - Only way to efficiently maintain a dynamic "min & max" among window primes.
  - Satisfies the constraints for large arrays.

### Corner cases to consider  
- Empty array
- Array with no primes at all
- Array with only one prime anywhere
- All numbers are the same prime
- Primes clustered together or spread apart
- k = 0 (only identical primes allowed)

### Solution

```python
def count_prime_gap_balanced_subarrays(nums, k):
    # Sieve of Eratosthenes: Find all primes up to max(nums)
    max_num = max(nums)
    is_prime = [False, False] + [True] * (max_num - 1)
    for i in range(2, int(max_num ** 0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, max_num + 1, i):
                is_prime[j] = False

    from bisect import bisect_left, bisect_right, insort, insort_left

    n = len(nums)
    primes_in_window = []
    left = 0
    result = 0

    for right in range(n):
        # Add new right element if it's a prime
        if is_prime[nums[right]]:
            insort_left(primes_in_window, nums[right])

        # Move left pointer to keep gap ≤ k or keep at >=2 primes
        while (len(primes_in_window) >= 2 and 
               primes_in_window[-1] - primes_in_window[0] > k):
            # Remove nums[left] if it's a prime
            if is_prime[nums[left]]:
                idx = bisect_left(primes_in_window, nums[left])
                primes_in_window.pop(idx)
            left += 1

        # If at least two primes and the window is valid, count subarrays
        # ending at `right` with primes_in_window[-1] - primes_in_window[0] ≤ k
        if len(primes_in_window) >= 2:
            # All subarrays starting between left and right (inclusive) and ending at right
            # when window [left, right] contains at least 2 primes and valid gap
            result += (left + 1 if left == 0 else (right - left + 1))

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n).  
  Each number is inserted/removed from the (sorted) prime window at most once, each taking O(log n). Total O(n log n). Sieve is O(m log log m) where m = max(nums), which is acceptable.

- **Space Complexity:** O(n),  
  Storing the sieve up to max(nums), and in worst case window for primes.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this solution if you needed to allow up to t non-prime numbers in the window as "wildcards"?  
  *Hint: Maintain a non-prime count alongside the prime window.*

- How would your answer change for non-contiguous subarrays (i.e., subsequences)?  
  *Hint: DP or combinatorial approaches, as window logic doesn't apply.*

- What if the array is streaming, so you can't review anything but current and previous k elements?  
  *Hint: Only track a fixed-size window using queue and min/max heaps.*

### Summary
We combined a **prime sieve**, **sliding window**, and **balanced BST/multiset** (using bisect on a sorted list in Python) to efficiently count all subarrays where the contained primes have a bounded gap. This is a strong example of the *two pointers with a balanced window* pattern, useful for subarray property problems with "range" (min/max) requirements and dynamic constraints. This pattern generalizes to many interval and subarray constraints where you need dynamic tracking of a statistic in the window.


### Flashcard
Use Sieve for primality, sliding window with sorted multiset of primes in current range, check if max − min ≤ k and count ≥ 2.

### Tags
Array(#array), Math(#math), Queue(#queue), Sliding Window(#sliding-window), Number Theory(#number-theory), Monotonic Queue(#monotonic-queue)

### Similar Problems
