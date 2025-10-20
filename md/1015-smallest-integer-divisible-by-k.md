### Leetcode 1015 (Medium): Smallest Integer Divisible by K [Practice](https://leetcode.com/problems/smallest-integer-divisible-by-k)

### Description  
Given a positive integer K, find the length of the smallest positive integer N such that:
- N consists of only the digit 1 (so, N could be 1, 11, 111, etc.)
- N is divisible by K.

Return the number of digits in N, or -1 if no such N exists.  
Note: N may be extremely large and won't always fit in standard integer types.

### Examples  

**Example 1:**  
Input: `K = 1`  
Output: `1`  
Explanation: 1 is made up of just one 1 and is divisible by 1.

**Example 2:**  
Input: `K = 2`  
Output: `-1`  
Explanation: No number formed by only digit 1's (e.g., 1, 11, 111, ...) is divisible by 2.

**Example 3:**  
Input: `K = 3`  
Output: `3`  
Explanation: 111 is the smallest such number, and 111 ÷ 3 = 37. So the answer is 3.

### Thought Process (as if you’re the interviewee)  
First, I recognize that constructing the actual number N is infeasible when K is large, since N could have a huge number of digits.  
Instead of creating N, I can simulate adding 1's digit by digit, leveraging the idea that:

If I want to know the remainder after appending another '1' to the end, I can use modulo arithmetic:
- For each step, remainder = (previous\_remainder × 10 + 1) % K

I should keep track of this remainder as I iteratively "build" each 1-digit number’s effect.  
If the remainder ever becomes 0, it means that the sequence of 1's built so far is divisible by K, and I return that length.

Optimization:
- If K is divisible by 2 or 5, then it's impossible to have a number consisting only of 1’s divisible by K, so I return -1 immediately.
- Why do I only loop at most K times? Because by the pigeonhole principle, if after K remainders we don't find 0, we must have seen a duplicate remainder (and will be in a cycle).

### Corner cases to consider  
- K is 1 (always possible, answer is 1)
- K is 2 or 5 (always impossible, answer is -1)
- K is large (10⁵), must not overflow
- K is a prime or has coprime factors with 10
- Check for input limits: 1 ≤ K ≤ 10⁵

### Solution

```python
def smallestRepunitDivByK(K):
    # Early return if K is divisible by 2 or 5; no such N possible
    if K % 2 == 0 or K % 5 == 0:
        return -1

    remainder = 0
    for length in range(1, K + 1):
        # Append another '1': multiply previous remainder by 10, add 1, take modulo K
        remainder = (remainder * 10 + 1) % K
        if remainder == 0:
            return length

    # Didn't find such N within K iterations, so no such number exists
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(K)  
  Because in the worst-case, we may try up to K different remainder states before cycling (by the pigeonhole principle).
- **Space Complexity:** O(1)  
  Only a constant number of variables are used; we do not build the actual number or store past remainders since the loop always terminates (since K is bounded by 10⁵).

### Potential follow-up questions (as if you’re the interviewer)  

- What is the mathematical reason that no such N exists when K is divisible by 2 or 5?  
  *Hint: Think about the last digit of a number made up entirely of 1's.*

- Can you return the integer N itself if it fits into a normal integer type?  
  *Hint: Consider constraints where K is small (e.g., K ≤ 9).*

- How would you handle inputs if 0 ≤ K? Or N allowed to have other repeating digits?  
  *Hint: Extend the logic to other digit patterns or both more flexible K and N.*

### Summary
This approach uses **modulo arithmetic** and a **sliding simulation** pattern to avoid constructing immense numbers, instead working by building the remainder step by step as we lengthen the chain of '1's.  
This is a classic application of the "remainder cycling" and "digit construction without overflow" pattern, a technique useful in any scenario where number construction is unworkably huge but divisibility or modular results suffice. It appears in problems involving repeating digits, digital roots, modular cycles, and large number divisibility.


### Flashcard
Build remainder iteratively: remainder = (prev_remainder×10+1) mod K; return length when remainder is 0, else −1 if cycle detected.

### Tags
Hash Table(#hash-table), Math(#math)

### Similar Problems
