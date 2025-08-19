### Leetcode 1414 (Medium): Find the Minimum Number of Fibonacci Numbers Whose Sum Is K [Practice](https://leetcode.com/problems/find-the-minimum-number-of-fibonacci-numbers-whose-sum-is-k)

### Description  
You are given an integer k. Your task is to find the minimum number of Fibonacci numbers whose sum is exactly k. You can use any Fibonacci number in the sum any number of times (i.e., repetition is allowed), and you should minimize the count of numbers used. The Fibonacci sequence here starts from 1, 1, 2, 3, 5, 8, … and so on (F₁ = 1, F₂ = 1, and Fₙ = Fₙ₋₁ + Fₙ₋₂ for n ≥ 3).

### Examples  

**Example 1:**  
Input: `k = 7`  
Output: `2`  
*Explanation: 7 = 5 + 2, which uses two Fibonacci numbers.*

**Example 2:**  
Input: `k = 10`  
Output: `2`  
*Explanation: 10 = 8 + 2, which uses two Fibonacci numbers.*

**Example 3:**  
Input: `k = 19`  
Output: `3`  
*Explanation: 19 = 13 + 5 + 1, which uses three Fibonacci numbers.*

### Thought Process (as if you’re the interviewee)  
First, I’d consider how to represent any integer as a sum of Fibonacci numbers. Since repetition is allowed but the goal is *minimum count*, my initial brute-force idea would be to try all combinations recursively. But this will be too slow for large k.

Instead, I notice that to minimize the number of Fibonacci numbers used, at each step I should always subtract the largest possible Fibonacci number ≤ current k. This greedy strategy works due to a property similar to the way we make change in the coin-change problem for coins with the Fibonacci property — no sum can be made "better" by picking smaller Fibonacci numbers before taking the largest possible.  

Hence, the approach is:
- Generate all Fibonacci numbers up to k.
- Iteratively select the largest Fibonacci number ≤ k, subtract it from k, and increment the count.
- Repeat until k == 0.

This greedy method is efficient because the Fibonacci sequence grows exponentially, so the number of steps is roughly O(log k).

### Corner cases to consider  
- k = 1 (edge case: smallest k)
- k is itself a Fibonacci number (should return 1)
- Large values of k (overflow or performance may be a concern)
- k requires multiple occurrences of 1 in the Fibonacci sum (e.g., k = 2)
- k = 0 (not in constraints, but for completeness)

### Solution

```python
def findMinFibonacciNumbers(k):
    # Step 1: Generate all Fibonacci numbers up to k
    fibs = [1, 1]
    while fibs[-1] < k:
        fibs.append(fibs[-1] + fibs[-2])
    
    count = 0
    # Step 2: Work backwards. At each step, subtract largest fib ≤ k
    idx = len(fibs) - 1
    while k > 0:
        if fibs[idx] <= k:
            k -= fibs[idx]
            count += 1
        else:
            idx -= 1  # try a smaller Fibonacci number
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log k)  
  Justification: Number of Fibonacci numbers up to k is O(log k), and each subtraction reduces k by at least half in the upper range.
- **Space Complexity:** O(log k)  
  We store all Fibonacci numbers up to k, which is O(log k) many.

### Potential follow-up questions (as if you’re the interviewer)  

- What if only *distinct* Fibonacci numbers are allowed?  
  *Hint: Consider representing k in Zeckendorf's representation (sum of non-consecutive Fibonacci numbers).*

- Can you solve it using recursion and memoization?  
  *Hint: Recursive approach but may TLE without proper pruning or memoization.*

- What if k can be negative or zero?  
  *Hint: How would your code change for non-positive k? Does the definition still apply?*

### Summary
This is a classic greedy problem where at each step you subtract the largest Fibonacci number ≤ k, minimizing the number of required summands. This is related to Zeckendorf's theorem if restricted to distinct Fibonacci numbers, but here, repetition is allowed. The algorithm uses the "greedy reduction" coding pattern, which is a common way to minimize the number of terms or coins under such monotonic conditions. It can also be applied to greedy coin change and representation problems where denominations have similar properties.

### Tags
Math(#math), Greedy(#greedy)

### Similar Problems
