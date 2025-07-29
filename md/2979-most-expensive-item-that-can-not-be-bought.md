### Leetcode 2979 (Medium): Most Expensive Item That Can Not Be Bought [Practice](https://leetcode.com/problems/most-expensive-item-that-can-not-be-bought)

### Description  
Given two distinct prime numbers, primeOne and primeTwo, you have an unlimited number of coins of each denomination. Every item in the market costs a unique positive integer. What is the *largest* price that CANNOT be purchased using any combination of coins (each coin is either primeOne or primeTwo)?  
Explain the mathematical reasoning and how you would find this value for given primes.

### Examples  

**Example 1:**  
Input: `primeOne = 2, primeTwo = 5`  
Output: `3`  
Explanation: Alice can buy any item that costs 2, 4, 5, 6, 7, 8, ... She cannot buy items that cost 1 or 3, so the answer is 3.

**Example 2:**  
Input: `primeOne = 3, primeTwo = 5`  
Output: `7`  
Explanation: Alice can form all values ≥8, but cannot create 1, 2, 4, or 7. The most expensive impossible price is 7.

**Example 3:**  
Input: `primeOne = 5, primeTwo = 7`  
Output: `23`  
Explanation: She cannot buy items priced at 1, 2, 3, 4, 6, 8, 9, 11, 13, 16, 18, or 23. All larger prices are possible; thus, 23 is the largest impossible price.

### Thought Process (as if you’re the interviewee)  
First, the brute force approach is to generate all values that can be written as `a × primeOne + b × primeTwo` for non-negative integers a, b, up to some limit, and then scan which values are not possible. However, as the primes get larger the search space explodes.

Mathematically, for two coprime numbers (i.e., distinct primes), the largest number that cannot be written as their non-negative integer combination is given by the Chicken McNugget Theorem:

    Most Expensive Non-obtainable = primeOne × primeTwo - primeOne - primeTwo

This formula works because two primes are always coprime, so the theorem applies.

Trade-off:  
- Brute-force is slow for large numbers: time grows quickly.  
- Using the theorem, the problem is O(1) — we just use the formula.

### Corner cases to consider  
- One or both primes equal to smallest prime (e.g., 2 or 3)
- Very large primes
- The order of primes doesn't matter (i.e., commutative)
- Absolute minimum: smallest possible answer is primeOne × primeTwo - primeOne - primeTwo
- Not applicable for non-primes, but the question says "distinct primes" only.

### Solution

```python
def mostExpensiveItem(primeOne, primeTwo):
    # Since both are primes and hence coprime, apply the Chicken McNugget Theorem
    return primeOne * primeTwo - primeOne - primeTwo
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). The answer is a simple calculation from the two primes.
- **Space Complexity:** O(1). No extra space is needed beyond variables for input and output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are more than two coin denominations?  
  *Hint: For three or more denominations, there is no closed formula, and the problem becomes much harder (known as the Frobenius number).*

- What if the numbers aren’t guaranteed to be coprime (primes)?  
  *Hint: If not coprime, infinitely many prices cannot be made; the answer is undefined unless gcd(primeOne, primeTwo) == 1.*

- How would you extend this to efficiently check if a particular price can be constructed?  
  *Hint: Use dynamic programming (unbounded knapsack) up to the given value.*

### Summary
This problem is a direct application of a math theorem (Chicken McNugget Theorem) for two coprime denominations, leading to an O(1) solution. The technique of reducing a combinatorial, subset-sum-style question to a number-theory formula is a powerful tool and sometimes appears in interview math-brain-teasers or optimization variants. The dynamic programming "coin change" or "unbounded knapsack" pattern is related for the more general question of which prices are constructible, especially if primes or coprimeness can’t be assumed.