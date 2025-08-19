### Leetcode 793 (Hard): Preimage Size of Factorial Zeroes Function [Practice](https://leetcode.com/problems/preimage-size-of-factorial-zeroes-function)

### Description  
Given an integer **K**, return the number of non-negative integers **x** such that the number of trailing zeroes in **x!** is exactly **K**.  
In other words, for the function **f(x)**, which counts trailing zeroes in **x!**, find how many x satisfy **f(x) = K**.

Trailing zeroes are created by multiplying 2 and 5 together (i.e., every occurrence of 10), so the count is primarily determined by the number of times 5 appears in the prime factorization of numbers from 1 to x.  
Return how many x satisfy this property; the answer can only be 0 or 5.

### Examples  

**Example 1:**  
Input: `K = 0`  
Output: `5`  
*Explanation: f(0) = f(1) = f(2) = f(3) = f(4) = 0. So all x in [0,4] satisfy f(x) = 0.*

**Example 2:**  
Input: `K = 5`  
Output: `0`  
*Explanation: No integer x exists such that f(x) = 5.*

**Example 3:**  
Input: `K = 3`  
Output: `5`  
*Explanation: f(15) = f(16) = f(17) = f(18) = f(19) = 3. All x in [15,19] satisfy f(x) = 3.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each x, compute trailing zeroes in x! and count how many x give exactly K zeroes. But x can be huge, and it’s too slow.
- **Key insight:** For large enough K, the count of x such that f(x) = K is either 0 or 5.
  - This is because f(x) only increases when x is a multiple of 5, so the trailing zeroes function has “plateaus.”
- **Efficient Approach:** Use binary search to find the smallest x such that f(x) = K, and the smallest x so that f(x) = K+1. The answer is their difference (number of x with exactly K zeros).  
- **Why is answer always 0 or 5?** Because on each “plateau” (where the count of zeros stays constant), it typically spans 5 consecutive integers, unless the plateau is “cut off” at powers of 5, which never happens for isolated values of K.

**Trade-off:** Binary search over x is efficient because each check (count trailing zeros) is O(log₅(x)).  
Total time is O(log(K) × log₅(K)).

### Corner cases to consider  
- K = 0 (special plateau at the start)
- Very large K (ensure upper bound in binary search handles 5K+1 correctly)
- K values where no x can achieve exactly K trailing zeroes (should return 0)
- Input at plateaus, between plateaus

### Solution

```python
def preimageSizeFZF(K: int) -> int:
    # Helper to count trailing zeros in x!
    def count_zeros(x):
        count = 0
        while x > 0:
            x //= 5
            count += x
        return count

    # Find the smallest x such that f(x) >= K
    def left_bound(K):
        low, high = 0, 5 * (K + 1)
        while low < high:
            mid = (low + high) // 2
            if count_zeros(mid) < K:
                low = mid + 1
            else:
                high = mid
        return low

    # The number of x such that f(x) == K is left_bound(K+1) - left_bound(K)
    return 5 if left_bound(K + 1) - left_bound(K) > 0 else 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log(K) × log₅(K)), since binary search is over range up to 5×K and each count_zeros is logarithmic in x.
- **Space Complexity:** O(1), only a constant amount of extra space used (no recursion).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize this to count numbers x where f(x) = K for a different base factorial (e.g., base-12 instead of base-10)?  
  *Hint: Consider all prime factors relevant to forming multiples of the base (e.g., track 2s and 3s for base-12).*

- Can you explain why plateaus of length 5 occur and whether there can ever be a plateau of length other than 5?  
  *Hint: Try writing out f(x) for consecutive x including around multiples of 5, 25, etc.*

- What’s the maximum value of K such that preimageSizeFZF(K) returns 5 within 32-bit integer limits?  
  *Hint: Check when count_zeros(x) first exceeds upper bounds for int.*

### Summary
We used a **double binary search pattern**—commonly useful for answering “exactly how many x satisfy property P” where the function is monotonic or plateaued. For this particular problem, understanding the properties of trailing zeroes in factorials allowed us to efficiently enumerate the solution's “jumps.”  
This pattern is especially useful for problems involving monotonic functions with flat plateaus, such as searching for target occurrences in the image of non-decreasing mappings.

### Tags
Math(#math), Binary Search(#binary-search)

### Similar Problems
- Factorial Trailing Zeroes(factorial-trailing-zeroes) (Medium)