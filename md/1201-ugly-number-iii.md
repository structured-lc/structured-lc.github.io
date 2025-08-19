### Leetcode 1201 (Medium): Ugly Number III [Practice](https://leetcode.com/problems/ugly-number-iii)

### Description  
Given four integers **n**, **a**, **b**, and **c**, find the nᵗʰ positive integer that is divisible by **a** or **b** or **c**. Each ugly number is a positive integer that is *divisible* by at least one of **a**, **b**, or **c**. Return the nᵗʰ such number in increasing order.

### Examples  

**Example 1:**  
Input: `n=3, a=2, b=3, c=5`  
Output: `4`  
Explanation: The ugly numbers are 2, 3, 4, 5, 6, ... The third one is 4.

**Example 2:**  
Input: `n=4, a=2, b=3, c=4`  
Output: `6`  
Explanation: The ugly numbers are 2, 3, 4, 6, 8, ... The fourth one is 6.

**Example 3:**  
Input: `n=5, a=2, b=11, c=13`  
Output: `10`  
Explanation: The ugly numbers are 2, 4, 6, 8, 10... (Because 10 is divisible by 2.)

### Thought Process (as if you’re the interviewee)  

Brute-force approach would be to iterate through integers, counting every time you find a number divisible by **a**, **b**, or **c**, until you reach the nᵗʰ such number.  
But for large **n** (up to 10⁹), this is inefficient and will time out.

Observe that the number of ugly numbers ≤ x grows as x increases. For a given **x**, we can count how many ugly numbers are ≤ x using the inclusion-exclusion principle:
- count = ⌊x/a⌋ + ⌊x/b⌋ + ⌊x/c⌋  
- subtract ⌊x/lcm(a, b)⌋, ⌊x/lcm(a, c)⌋, ⌊x/lcm(b, c)⌋ (to remove double-counts)  
- add back ⌊x/lcm(a, b, c)⌋ (since those were subtracted three times, added once each for each pair, so we need to add back)

Using this count function, we can apply **binary search** to find the smallest **x** with count(x) ≥ n. This leverages the monotonicity: as x increases, count(x) increases.

Why binary search? Because for a candidate **mid**, we can efficiently determine if we've seen n ugly numbers up to mid, requiring only log(max_input) rounds to finish.

### Corner cases to consider  
- **a**, **b**, or **c** are equal  
- Extremely large **n** (up to 10⁹)  
- **a**, **b**, **c** not co-prime; heavy overlap  
- n = 1 (smallest ugly number is min(a, b, c))  
- Large values for all parameters  

### Solution

```python
def gcd(x, y):
    while y:
        x, y = y, x % y
    return x

def lcm(x, y):
    return x * y // gcd(x, y)

def nthUglyNumber(n, a, b, c):
    def count(x):
        ab = lcm(a, b)
        ac = lcm(a, c)
        bc = lcm(b, c)
        abc = lcm(ab, c)
        # Inclusion-Exclusion
        return (
            x // a + x // b + x // c
            - x // ab - x // ac - x // bc
            + x // abc
        )
    left, right = 1, 2 * 10**9
    while left < right:
        mid = (left + right) // 2
        if count(mid) < n:
            left = mid + 1
        else:
            right = mid
    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log(max_val)), where max_val = 2 × 10⁹ (binary search steps), with each step doing constant work (LCM, divisions).
- **Space Complexity:** O(1), using only a fixed amount of extra space (few integers for lcm calculations and loop counters).

### Potential follow-up questions (as if you’re the interviewer)  

- What if **a**, **b**, and **c** could be up to 100 values instead of 3?  
  *Hint: Consider how inclusion-exclusion generalizes and its limits for many sets (exponential in number of divisors).*

- Could you find the kᵗʰ ugly number for k very large, but where **a**, **b**, and **c** have gcd > 1?  
  *Hint: Consider overlap and how lcm impacts density of ugly numbers.*

- How would your code change if “ugly number” instead meant divisible by all of a, b, or c, instead of any?  
  *Hint: Now you’d look for multiples of lcm(a, b, c).*

### Summary
This approach uses **binary search on the answer** combined with **inclusion-exclusion** for fast counting — a common pattern for “find kᵗʰ smallest in a monotone sequence.” It’s useful in scheduling, sorted selection, GCD/LCM problems, and many LeetCode “find kth” variants where brute-force is not practical.

### Tags
Math(#math), Binary Search(#binary-search), Combinatorics(#combinatorics), Number Theory(#number-theory)

### Similar Problems
- Ugly Number II(ugly-number-ii) (Medium)