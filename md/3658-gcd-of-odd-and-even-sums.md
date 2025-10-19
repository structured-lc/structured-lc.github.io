### Leetcode 3658 (Easy): GCD of Odd and Even Sums [Practice](https://leetcode.com/problems/gcd-of-odd-and-even-sums)

### Description  
Given an integer **n**, calculate the sum of the first **n** odd numbers and the sum of the first **n** even numbers. Return the greatest common divisor (GCD) of these two sums.  
- The iᵗʰ odd number is 2×i - 1  
- The iᵗʰ even number is 2×i  
Formally,  
- odd\_sum = 1 + 3 + 5 + ... + (2n-1)  
- even\_sum = 2 + 4 + 6 + ... + 2n  
Return GCD(odd\_sum, even\_sum).

### Examples  

**Example 1:**  
Input: `n = 2`  
Output: `2`  
Explanation:  
odd\_sum = 1 + 3 = 4  
even\_sum = 2 + 4 = 6  
GCD(4, 6) = 2

**Example 2:**  
Input: `n = 3`  
Output: `3`  
Explanation:  
odd\_sum = 1 + 3 + 5 = 9  
even\_sum = 2 + 4 + 6 = 12  
GCD(9, 12) = 3

**Example 3:**  
Input: `n = 1`  
Output: `1`  
Explanation:  
odd\_sum = 1  
even\_sum = 2  
GCD(1, 2) = 1

### Thought Process (as if you’re the interviewee)  
First, compute the sums for the first **n** odd and even numbers:
- The sum of first n odd numbers: 1 + 3 + ... + (2n-1) = n²  
- The sum of first n even numbers: 2 + 4 + ... + 2n = n(n+1)  
So we need to return **GCD(n², n(n+1))**.

Notice that GCD(n², n(n+1)) = n × GCD(n, n+1)  
Since n and n+1 are always coprime (their only common divisor is 1),  
so GCD(n, n+1) = 1.  
Thus, **the answer is always n**.

### Corner cases to consider  
- n = 1 (minimum valid input)
- Large n (to check for possible overflow or performance)
- n is even or odd (does not affect, since formula holds)
- n = 0 (if allowed by constraints – but not meaningful for sequence sums)

### Solution

```python
def gcd_of_odd_even_sums(n):
    # Sum of first n odd numbers is n²
    # Sum of first n even numbers is n × (n+1)
    # GCD(n², n(n+1)) = n × GCD(n, n+1) = n × 1 = n
    return n
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). All operations are constant time, using only basic arithmetic.
- **Space Complexity:** O(1). No extra data structures or recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the question asks for GCD of sum of first n odd numbers and sum of first m even numbers?
  *Hint: The formula would not be as simple, and you’d likely need to compute both sums explicitly and use the Euclidean algorithm.*

- What if you are given an array of numbers and need to separate sum of even indexed elements and odd indexed elements and return their GCD?
  *Hint: Traverse the array, sum at odd/even positions, then compute GCD.*

- Can you compute the GCD without actually calculating large sums for big n, e.g., using properties of numbers to avoid overflow?
  *Hint: Use mathematical formulas for summats (e.g. Sₙ,odd = n²), and properties of GCD to reduce the numbers before any calculation.*

### Summary
This problem uses the **mathematical reduction** pattern, deriving a closed-form for the result and avoiding brute-force computations. Recognizing patterns like arithmetic series and GCD properties provides instant O(1) solutions. Such techniques are broadly useful in problems asking for sums or GCDs over standard integer sequences.

### Tags
Math(#math), Number Theory(#number-theory)

### Similar Problems
