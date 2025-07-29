### Leetcode 279 (Medium): Perfect Squares [Practice](https://leetcode.com/problems/perfect-squares)

### Description  
Given a positive integer n, return the minimum number of perfect square numbers (like 1, 4, 9, 16, …) that sum to n.

A perfect square is an integer that’s the square of an integer (e.g., 1 = 1×1, 4 = 2×2, 9 = 3×3).  
You can use each square as many times as needed.  
This is similar to the coin change problem — but the “coins” are perfect squares.

### Examples  

**Example 1:**  
Input: `n = 12`  
Output: `3`  
*Explanation: 12 = 4 + 4 + 4. Any decomposition using fewer than 3 perfect squares doesn’t work.*

**Example 2:**  
Input: `n = 13`  
Output: `2`  
*Explanation: 13 = 4 + 9.*

**Example 3:**  
Input: `n = 9`  
Output: `1`  
*Explanation: 9 is already a perfect square.*

### Thought Process (as if you’re the interviewee)  
Let’s start by thinking: for each number less than n, what’s the least number of perfect squares it can be broken into?

**Brute-force idea:**  
Try every possible combination of squares less than or equal to n, recursively subtracting squares, but this will create lots of repeated subproblems and is highly inefficient.

**Optimize with Dynamic Programming:**  
We’ll use a dp array where dp[i] represents the minimal number of squares to sum to i.

- For each i from 1 to n:
    - Try subtracting every perfect square less than or equal to i.
    - Use dp[i - (k×k)] + 1, where k×k ≤ i, and take the minimum.

This ensures that all smaller subproblems are solved already, and each number builds on those answers.

**Why this approach:**  
- It’s similar to the coin change problem, where coins are the perfect squares.
- The states are “total so far”, not the order or combination, which keeps the process efficient.
- There is an even more space-efficient method using BFS — treating this as finding the shortest path from n down to 0 by subtracting perfect squares — but the DP method is easier to write and reason about for most interviews.

### Corner cases to consider  
- n = 1 (should return 1)
- n is a perfect square itself (should return 1)
- Small cases (n ≤ 4)
- Large n just above a perfect square (e.g., 10, 26, 50)
- Powers of two (e.g., 4, 16, etc.)
- Very large n near constraint boundary (performance)

### Solution

```python
def numSquares(n: int) -> int:
    # dp[i] will be the minimal number of perfect squares summing to i
    dp = [float('inf')] * (n + 1)
    dp[0] = 0  # 0 needs zero squares

    # Precompute all perfect squares <= n
    squares = []
    k = 1
    while k * k <= n:
        squares.append(k * k)
        k += 1

    # Iterate through all numbers from 1 to n
    for i in range(1, n + 1):
        # Try every square less than or equal to i
        for sq in squares:
            if sq > i:
                break
            if dp[i - sq] + 1 < dp[i]:
                dp[i] = dp[i - sq] + 1
    return dp[n]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × √n), because for each i from 1 to n, we try each square less than or equal to i (≈ √n).

- **Space Complexity:**  
  O(n), for the dp array of size n+1 and the list of squares.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve it in O(n) space, or optimize it further?
  *Hint: Could you use rolling arrays or BFS with set?*

- What if you had to return the actual combination of squares, not just the count?
  *Hint: Track the path or parents for reconstruction of result.*

- Could you solve it for arbitrarily large n, where n > 10⁴?
  *Hint: Are there number theory theorems (e.g., Lagrange’s Four Square Theorem) that can help?*

### Summary
This problem is a classic example of **Dynamic Programming** — specifically, the *“minimum number of coins for a sum”* pattern.  
It’s applicable anywhere you want to minimize the “number of moves” or “number of items” covering a sum — such as the coin change problem, staircase climbing with limited steps, or parsing decompositions.  
Breadth‑first search can also be used here as a shortest path over implicit “states”.  
The number theoretic result (Lagrange’s Four-Squares Theorem) guarantees every n can be written as sum of at most four squares, which allows for optimization in some advanced solutions.