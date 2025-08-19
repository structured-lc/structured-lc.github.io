### Leetcode 441 (Easy): Arranging Coins [Practice](https://leetcode.com/problems/arranging-coins)

### Description  
You have n coins and want to build a staircase with these coins. The staircase consists of k rows where the iᵗʰ row has exactly i coins. Given n, find the maximum number of complete rows you can build.

### Examples  

**Example 1:**  
Input: `n = 5`  
Output: `2`  
*Explanation: Row 1 has 1 coin, row 2 has 2 coins, total = 3 coins. Row 3 would need 3 coins but we only have 2 remaining, so answer is 2 complete rows.*

**Example 2:**  
Input: `n = 8`  
Output: `3`  
*Explanation: Rows 1,2,3 use 1+2+3=6 coins. Row 4 would need 4 coins but we only have 2 remaining, so answer is 3 complete rows.*

### Thought Process (as if you're the interviewee)  
This problem is about finding the largest k such that 1+2+3+...+k ≤ n. This is essentially finding the largest k where the sum of first k natural numbers doesn't exceed n.

Approaches:
1. **Brute force**: Start from k=1 and keep adding until sum exceeds n
2. **Mathematical formula**: Use the formula k(k+1)/2 ≤ n and solve the quadratic equation
3. **Binary search**: Search for the largest valid k using binary search

The mathematical approach is most efficient: k(k+1)/2 ≤ n gives us k ≤ (-1 + √(1+8n))/2.

### Corner cases to consider  
- n = 0 (no coins)
- n = 1 (can build 1 complete row)
- Perfect triangular numbers (like n = 6 = 1+2+3)
- Large values of n
- Edge case where k(k+1)/2 = n exactly

### Solution

```python
def arrangeCoins(n):
    # Mathematical approach using quadratic formula
    # We want largest k such that k(k+1)/2 <= n
    # Rearranging: k^2 + k - 2n <= 0
    # Using quadratic formula: k = (-1 + sqrt(1 + 8n))/2
    
    import math
    return int((-1 + math.sqrt(1 + 8 * n)) / 2)

# Alternative binary search approach
def arrangeCoinsBinarySearch(n):
    left, right = 0, n
    
    while left <= right:
        mid = (left + right) // 2
        coins_needed = mid * (mid + 1) // 2
        
        if coins_needed == n:
            return mid
        elif coins_needed < n:
            left = mid + 1
        else:
            right = mid - 1
    
    return right

# Brute force approach (for understanding)
def arrangeCoinsbruteForce(n):
    k = 0
    total = 0
    
    while total + k + 1 <= n:
        k += 1
        total += k
    
    return k

# Most optimized mathematical approach without imports
def arrangeCoinsMath(n):
    # Using integer arithmetic to avoid floating point precision issues
    # We want largest k such that k(k+1)/2 <= n
    # Equivalent to k^2 + k <= 2n
    # Using approximation: k ≈ sqrt(2n)
    
    k = int((2 * n) ** 0.5)
    
    # Check if k is correct, if not adjust by ±1
    if k * (k + 1) // 2 <= n:
        # Check if k+1 is also valid
        if (k + 1) * (k + 2) // 2 <= n:
            return k + 1
        else:
            return k
    else:
        return k - 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) for mathematical approach, O(log n) for binary search, O(√n) for brute force.
- **Space Complexity:** O(1) for all approaches as we only use constant extra space.

### Potential follow-up questions (as if you're the interviewer)  

- What if you needed to return the number of remaining coins after building maximum complete rows?  
  *Hint: Calculate remaining = n - k(k+1)/2 where k is the result.*

- How would you handle very large values of n that might cause integer overflow?  
  *Hint: Use long data types or implement binary search with careful overflow checking.*

- Can you solve this problem if the staircase pattern was different (e.g., powers of 2)?  
  *Hint: Modify the sum formula accordingly and apply similar mathematical or binary search approaches.*

### Summary
This problem demonstrates multiple solution approaches to the same mathematical problem. The key insight is recognizing the triangular number pattern and choosing the most appropriate method based on constraints. The mathematical approach shows how algebraic manipulation can lead to O(1) solutions, while binary search provides a more general framework that works even when closed-form solutions aren't available.

### Tags
Math(#math), Binary Search(#binary-search)

### Similar Problems
