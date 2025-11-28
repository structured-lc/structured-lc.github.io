### Leetcode 2818 (Hard): Apply Operations to Maximize Score [Practice](https://leetcode.com/problems/apply-operations-to-maximize-score)

### Description  
You are given an array **nums** of n positive integers and an integer **k**.  
Starting from a score of 1, you can perform up to **k** operations. For each operation:

- Select any **non-empty subarray** (has not been selected before).
- In that subarray, select the element with the **highest prime score** (prime score = number of distinct prime factors).  
  If ties, pick the **leftmost** one.
- Multiply your current score by this element.

Maximize the final score after at most k operations, returning the result modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `nums = [8,3,2], k = 2`  
Output: `48`  
*Explanation:  
Possible selections:  
- Subarray  has prime score 1 (8 = 2³), [3] has score 1 (3 is prime), [2] has score 1 (2 is prime).  
- Subarray [8,3] → 8:1, 3:1  
- Subarray [3,2] → 3:1, 2:1  
- Subarray [8,3,2] → 8:1, 3:1, 2:1  
So, all elements have same prime score; we pick largest elements twice: 8 and 3.  
1 × 8 × 3 = 24. But maximizing over all possible ways, 8 × 3 = 24, then include 2 → 24 × 2 = 48, which gives max score in two operations, so output is 48.*

**Example 2:**  
Input: `nums = [2,2,2], k = 3`  
Output: `8`  
*Explanation:  
All numbers are prime with score 1. Select them all sequentially: 1 × 2 × 2 × 2 = 8.*

**Example 3:**  
Input: `nums = [6,9,15], k = 2`  
Output: `135`  
*Explanation:  
Prime scores: 6→2 (2,3), 9→1 (3), 15→2 (3,5).  
Best: Select subarrays allowing 15 and 9, or 6 and 15, largest first: 1 × 15 × 9 = 135 or 1 × 15 × 6 = 90, so 135 is maximum.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Try all possible sequences of k distinct subarrays, select the eligible element in each, multiply the numbers. But there are O(n²) subarrays, so this approach is computationally infeasible for large n.

- **Optimization:**  
  Notice:  
  - The operation allows selecting any subarray that hasn’t been selected before.  
  - To get the biggest score, always pick the largest values with the highest prime scores.
  - The number’s contribution is *multiplied*; larger numbers and those present in more subarrays increase the total more.

- **Monotonic Stack, Counting Intervals:**  
  For each number, count how many subarrays it can be the “chosen” in and its prime score is higher than all to the left/right (span of influence).
  - For every possible “center” (i.e. each nums[i]), determine the number of subarrays where it’s the candidate.
  - Use monotonic stack to find the leftmost/rightmost such boundaries for each element (like “next greater”/“previous greater” pattern), based on the **prime score**.
  - For top k most valuable occurrences, use exponents (since ops are multiplicative).

- **Algorithm steps:**  
  1. Precompute prime scores for all elements.
  2. For each element, use two monotonic stacks to find out how many subarrays this number is the “max prime score” in.
  3. Collect all (element value, count) pairs.
  4. To maximize score, pick top k value-count pairs, multiply answer by value^count for each (up to k total ops).
  5. Use fast power and modulo as necessary.

- **Trade-offs:**  
  + Optimize for time using stacks and sorting (since the brute-force is intractable).
  + Space is increased for auxiliary data, but within N.

### Corner cases to consider  
- nums has all identical values.
- All nums are prime.
- k > number of possible subarrays.
- nums has length 1.
- Elements are large (test integer overflow/modulo).
- Elements with the same prime score but different values.
- k = 0 (no operation).

### Solution

```python
MOD = 10 ** 9 + 7

def count_prime_scores(max_num):
    # Sieve to get number of distinct prime factors ("prime score") for each num up to max_num
    prime_scores = [0] * (max_num + 1)
    for i in range(2, max_num + 1):
        if prime_scores[i] == 0:
            for j in range(i, max_num + 1, i):
                prime_scores[j] += 1
    return prime_scores

def applyOperations(nums, k):
    n = len(nums)
    max_num = max(nums)
    prime_scores = count_prime_scores(max_num)
    scores = [prime_scores[x] for x in nums]

    # For each index, find PreviousGreaterEqual and NextGreater (exclusive) by prime score
    left = [-1] * n
    right = [n] * n
    stack = []
    # Find previous strictly greater (by prime score), left boundary
    for i in range(n):
        while stack and scores[stack[-1]] < scores[i]:
            stack.pop()
        if stack:
            left[i] = stack[-1]
        stack.append(i)

    stack = []
    # Find next strictly greater (by prime score), right boundary
    for i in range(n-1, -1, -1):
        while stack and scores[stack[-1]] <= scores[i]:
            stack.pop()
        if stack:
            right[i] = stack[-1]
        stack.append(i)
    
    # For each number, compute # of subarrays where it is "best pick"
    contribs = []
    for i in range(n):
        count = (i - left[i]) * (right[i] - i)
        contribs.append((nums[i], count))

    # Sort by number (value) descending
    contribs.sort(reverse=True)

    ans = 1
    for value, count in contribs:
        use = min(count, k)
        if use == 0:
            continue
        # Fast exponentiation for value^use
        cur = pow(value, use, MOD)
        ans = (ans * cur) % MOD
        k -= use
        if k == 0:
            break
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n + max(nums) log log max(nums))  
  - Sieve of Eratosthenes to compute all prime scores up to max(nums): O(max(nums) log log max(nums))
  - Two monotonic stack passes: O(n)
  - Sorting contributions: O(n log n)
  - Final aggregation O(n)

- **Space Complexity:** O(n + max(nums))  
  - For stacks, scores, sieve, counts, and contributions.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you improve the solution if all numbers are ≤ 1000?  
  *Hint: Small sieve, precompute all scores, use COUNT array for value multiplicities.*

- What if k is much larger than n?  
  *Hint: All possible windows can be used; must bound how many operations are feasible!*

- What changes if prime scores are based on total prime factors (multiplicities), not distinct primes?  
  *Hint: Count multiplicities in prime factorization, adjust sieve approach.*

### Summary
This problem uses a combination of number theory (counting prime factors), **monotonic stack** (previous/next greater by prime score) to efficiently count intervals, and **greedy selection** to maximize multiplicative score within k moves.  
The monotonic stack + interval counting is a classic for **"subarray contribution"** problems, and exponentiation under modulus is a common pattern for products over large counts. This approach is useful in various maximization/minimization in arrays based on index ranges.


### Flashcard
Greedily select k subarrays with highest prime-factor scores; multiply selected elements—prioritize large values with high prime contributions.

### Tags
Array(#array), Math(#math), Stack(#stack), Greedy(#greedy), Sorting(#sorting), Monotonic Stack(#monotonic-stack), Number Theory(#number-theory)

### Similar Problems
- Next Greater Element IV(next-greater-element-iv) (Hard)