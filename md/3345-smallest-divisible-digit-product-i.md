### Leetcode 3345 (Easy): Smallest Divisible Digit Product I [Practice](https://leetcode.com/problems/smallest-divisible-digit-product-i)

### Description  
Given two integers n and t, find the **smallest integer ≥ n such that the product of its digits is divisible by t**.  
You need to return that minimal number.

### Examples  

**Example 1:**  
Input: `n = 10, t = 2`  
Output: `10`  
*Explanation: The product of digits = 1 × 0 = 0, and 0 is divisible by 2.*

**Example 2:**  
Input: `n = 13, t = 5`  
Output: `15`  
*Explanation: 1 × 5 = 5, which is divisible by 5.  
13 → 1×3=3 (not divisible), 14→1×4=4 (not divisible).*

**Example 3:**  
Input: `n = 21, t = 9`  
Output: `27`  
*Explanation:  
21: 2×1=2 (not divisible),  
22: 2×2=4, 23: 2×3=6, 24: 2×4=8, 25: 2×5=10, 26: 2×6=12, 27: 2×7=14.  
Wait, that's not divisible. Let's check further.  
Actually, 27: 2×7=14 (not divisible), 28: 2×8=16, 29: 2×9=18 (**divisible by 9!**).  
So Output = `29`.*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:** Start at n, for each number, compute the product of its digits. If it's divisible by t, return it.  
- This is quick if t is small, but could seem slow if n is large. However, one key observation: **Any number with a `0` digit will have product 0, which is divisible by any t**. Because in every contiguous block of 10 numbers, you will hit one with a zero somewhere (e.g., 10, 20, …).  
- Therefore, the answer will always be within the next 10 consecutive numbers from `n` (since within 10 you'll encounter a zero in the units digit).  
- So, the code need only check at most 10 numbers, keeping this highly efficient.

- **Optimized solution:**  
  - For each `num` from n up to n+9:
    - Compute product of digits.
    - If product is divisible by t, return num.
  - This is fast, O(1) – at most 10 numbers, each with at most log₁₀(n) digits.

### Corner cases to consider  
- n already satisfies the condition (check at the start)
- t = 1 (every number satisfies, because any digit-product % 1 == 0)
- t is very large (but in practice, with 0 in digits, product = 0, which is divisible by any t)
- n contains a zero
- Input values close to integer limits

### Solution

```python
def smallestDivisibleDigitProduct(n: int, t: int) -> int:
    # Helper to compute product of digits of a number
    def digit_product(x: int) -> int:
        product = 1
        for ch in str(x):
            product *= int(ch)
        return product

    # Try the next 10 consecutive numbers (including n)
    for num in range(n, n + 10):
        if digit_product(num) % t == 0:
            return num

    # Input constraints guarantee an answer exists within this range
    # So no need for further checks
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(10 × log n) = O(1)  
  At most 10 checks, each with up to log₁₀(n) digits. But since 10 is constant, overall time is constant.
- **Space Complexity:** O(1)  
  Only a fixed number of variables, no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if t is 0 or negative?  
  *Hint: Think about valid divisors and constraints for t.*

- Can you return all such numbers within the next 10 consecutive numbers?  
  *Hint: Collect or filter over the checked range rather than returning early.*

- If the input can include very large n, or n can have up to 100,000 digits, does your solution scale?  
  *Hint: Consider how to avoid integer overflow or optimize digit product calculation for big integers.*

### Summary
This is a **math simulation** plus **digit manipulation** problem, relying on the guarantee that a product-zero (via digit-zero) always occurs every 10 numbers.  
The brute-force approach is also optimal due to the limited candidate space.  
This approach (digit-product, digit-sum within a range) is a common pattern in digit dynamic programming (Digit DP), and useful wherever number properties or divisibility constraints relate to digit operations.

### Tags
Math(#math), Enumeration(#enumeration)

### Similar Problems
- Smallest Number With Given Digit Product(smallest-number-with-given-digit-product) (Medium)