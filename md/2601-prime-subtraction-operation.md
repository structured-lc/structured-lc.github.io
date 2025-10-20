### Leetcode 2601 (Medium): Prime Subtraction Operation [Practice](https://leetcode.com/problems/prime-subtraction-operation)

### Description  
Given an integer array `nums`, you can perform the following operation any number of times:
- Pick any index (unpicked before), choose any prime less than the element at that index, and subtract it from that element. 

Return `true` if, after any sequence of operations, the array can be made **strictly increasing** (i.e., nums < nums[1] < ... < nums[n-1]), otherwise return `false`.  
The goal is to decide if it is possible to make `nums` strictly increasing by using each index at most once and subtracting an appropriate prime from it.

### Examples  

**Example 1:**  
Input: `[4,9,6,10]`,  
Output: `true`  
*Explanation:  
Start with 4 − 3 = 1 (largest prime < 4),  
9 − 7 = 2  (largest prime < 9 and > 1 diff),  
6 − 3 = 3  (largest prime < 6 and > 2 diff),  
10 − 5 = 5 (largest prime < 10 and > 3 diff).  
Array becomes [1,2,3,5], which is strictly increasing.*

**Example 2:**  
Input: `[6,8,11,12]`,  
Output: `true`  
*Explanation:  
6 − 5 = 1, 8 − 7 = 1  
But we need the array to be strictly increasing.  
So, subtract 3 from 6: 6 − 3 = 3;  
Subtract 5 from 8: 8 − 5 = 3;  
Now, subtract 7 from 11: 11 − 7 = 4;  
12 − 11 = 1, but 12-11=1 is not possible, so subtract 11 (prime < 12): 12-11=1.  
So [3,3,4,1] is not strictly increasing, but with careful prime choices it's possible to reach a strictly increasing configuration (e.g. [1,2,3,5]).*

**Example 3:**  
Input: `[5,8,3]`,  
Output: `false`  
*Explanation:  
No matter which prime is chosen and subtracted from 3, it can’t be made greater than 8 or in a strictly increasing sequence with previous numbers.*

### Thought Process (as if you’re the interviewee)  
- **Naive approach:** For each position, try every possible prime less than its value; recursively check all prime-subtraction combinations. This is exponential and infeasible.
- **Optimization:**  
  - Realize that each position can only be picked once and that we only care about making the sequence strictly increasing after each subtraction.
  - For each index `i`, make sure `nums[i]` (possibly after a prime subtraction) is strictly less than the next number in the array. 
  - Precompute all prime numbers up to max(nums) using Sieve of Eratosthenes.
  - For each index `i` (from 0 to n-1), use binary search to find the largest prime less than `nums[i]` such that, after subtraction, the new value is strictly greater than previous (nums[i-1]) and strictly less than the next (if any).
- **Why this approach:**  
  - Precomputing primes is fast and avoids repeated primality checking.
  - The binary search over primes makes finding the optimal subtraction quick.
  - Iterating left-to-right ensures that previous values can always be checked for the strictly increasing condition.

### Corner cases to consider  
- Single-element array (always true, as it's trivially increasing).
- All values equal (must subtract primes as needed).
- Large values (ensure Sieve of Eratosthenes is implemented efficiently up to max(nums)).
- Descending arrays (must subtract maximum appropriate primes).
- Edge case where no prime can be subtracted to meet strict increase (e.g., low numbers).
- Already strictly increasing sequence (no need to subtract).

### Solution

```python
def prime_sub_operation(nums):
    # Helper function to generate all primes up to max_num using Sieve of Eratosthenes
    def sieve(max_num):
        is_prime = [True] * (max_num + 1)
        is_prime[0:2] = [False, False]
        for i in range(2, int(max_num ** 0.5) + 1):
            if is_prime[i]:
                for j in range(i*i, max_num + 1, i):
                    is_prime[j] = False
        return [i for i, flag in enumerate(is_prime) if flag]

    n = len(nums)
    max_val = max(nums)
    primes = sieve(max_val)
    
    prev = 0  # Strictly less than first possible value
    for idx, val in enumerate(nums):
        # Find the largest prime less than val so that val - p > prev
        left, right = 0, len(primes) - 1
        candidate = 0
        while left <= right:
            mid = (left + right) // 2
            p = primes[mid]
            if p < val and (val - p) > prev:
                candidate = p
                left = mid + 1
            else:
                right = mid - 1
        new_val = val - candidate
        if new_val <= prev:
            return False
        prev = new_val
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log P), where n is len(nums) and P is the number of primes ≤ max(nums). Sieve is O(N log log N) for max(nums), and each array element uses binary search O(log P) over primes.
- **Space Complexity:** O(P) where P is the number of primes ≤ max(nums), for the primes list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the range of `nums` can be up to 10⁹?  
  *Hint: Cannot precompute all primes, so need to introduce dynamic primality checks or segmented sieve.*

- What if we can subtract multiple primes from the same index (can be picked more than once)?  
  *Hint: The problem becomes similar to unlimited coin change with constraint for strictly increasing.*

- Can you find the **minimum number of operations** needed to make `nums` strictly increasing?  
  *Hint: Each subtraction is counted; try BFS or DP.*

### Summary
This problem is a classic example of **greedy choice with precomputed structures**—generating all possible prime subtractions efficiently up to the max element, then checking feasibility with binary search for the best subtraction at each step.  
Patterns here—greedy, binary search, precomputation (Sieve of Eratosthenes), and number theory—apply in many sequence transformation/interpolation tasks, especially where you need dynamic adjustment and careful feasibility checks.


### Flashcard
For each element, subtract the largest possible prime to make the sequence strictly increasing.

### Tags
Array(#array), Math(#math), Binary Search(#binary-search), Greedy(#greedy), Number Theory(#number-theory)

### Similar Problems
