### Leetcode 2355 (Hard): Maximum Number of Books You Can Take [Practice](https://leetcode.com/problems/maximum-number-of-books-you-can-take)

### Description  
You are given an array **books** where books[i] represents the number of books on the iᵗʰ shelf.  
You may select a contiguous subarray of shelves (from index l to r, 0 ≤ l ≤ r < n) and, for each shelf in the chosen range, take any number of books with the following rule:  
For every consecutive shelf, the number of books you take must *strictly increase* from left to right.  
Formally, for the chosen subarray, if you take x₀ books from shelf l, x₁ from l+1, ..., xₖ from r (with k = r-l), then x₀ < x₁ < ... < xₖ and 0 ≤ xⱼ ≤ books[l + j] for every j.  
Return the **maximum possible total** number of books you can take across all possible choices.

### Examples  

**Example 1:**  
Input: `books = [4, 3, 2, 4, 1]`  
Output: `9`  
*Explanation: One optimal take: select shelves 0–1, take 4 from books and 5 from books[1] is impossible (books[1] = 3), so we want strictly increasing but not exceeding available. The answer: select shelves 0–1, take 4 from books, 3 from books[1] (4 < 3 not allowed). Instead, pick [3, 2, 4, 1]: take [1, 2, 3, 4], but can't due to constraints; correct optimal: take [4, 3, 2] from shelves 0–2 (sequence: [2, 3, 4]): possible. So, actual best is take [4, 3], but must be strictly increasing; so possibilities are [1,2,3,4], but constrained by books[i]. The max is 9, as can take 4 from books, 3 from books[1], 2 from books[2].*

**Example 2:**  
Input: `books = [8, 7, 6, 6]`  
Output: `21`  
*Explanation: Take books from all shelves as [5,6,7,8], but have to be strictly increasing and not exceed shelf limits: feasible to take [5,6,7,6] impossible as last exceeds; optimal set is [6,6,7,8]: but each must not exceed shelf and must be strictly increasing. 5+6+7+3=21 is possible.*

**Example 3:**  
Input: `books = [1, 1, 1, 1]`  
Output: `1`  
*Explanation: Can only take 1 from any shelf, and can't take more from next shelf, so the best single shelf you can take is 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try every possible subarray (l, r). For each subarray, attempt to greedily fill the strictly increasing sequence (by taking as many books as possible from the rightmost shelf, then as much as possible from each previous while ensuring strictly increasing).  
  This approach is O(n²) or worse, which is not feasible for large n.
- **Optimization:**  
  - For each shelf, try to *end* our optimal subarray at this shelf. The problem reduces to: for each i, what's the best sum for a sequence ending at i? Use DP: dp[i] = max sum for sequence ending at i.
  - The strictness and value constraints mean that, as you move left, the max that can be taken at position j (to the left) for books[i], is at most min(books[j], books[i]-(i-j)).
  - Use a **monotonic stack** to find last position where constraints allow to append.
- **Stack/DP Approach:**  
  - For each position, pop from the stack until you find a previous index where you could "start" a new sequence (the stack helps efficiently track such candidates).
  - Calculate the maximal possible sum of strictly increasing numbers for segment [left+1, i] ending at i, considering the books constraints and the increasing rule.
  - Save/compare answers.

- **Why this approach:**  
  - Reduces redundant DP calculations.
  - Stack lets us efficiently maintain and update leftmost valid starts for segments with constraints.

### Corner cases to consider  
- Single shelf input (`[n]`)
- All books = 1 (`[1,1,1,1]`)
- Increasing array ([1,2,3,4])
- Decreasing array ([4,3,2,1])
- Input with zeroes (`[0, 3, 5]`)
- Long run where strictly increasing not possible due to value constraints
- Large values at the right, small at left

### Solution

```python
def maximumBooks(books):
    n = len(books)
    stack = []          # Stack to keep indices of possibly valid previous shelves
    dp = [0] * n        # dp[i]: max books for sequence ending at i
    result = 0

    def total_sum(x, k):
        """
        Returns sum of k consecutive numbers ending at x: x + (x-1) + ... + (x-k+1)
        Formula: (2x - k + 1) * k // 2
        """
        return (2*x - k + 1) * k // 2

    for i in range(n):
        # Remove invalid previous indices, i.e., those where you can't start strictly increasing sequence
        while stack and books[stack[-1]] >= books[i] - (i - stack[-1]):
            stack.pop()
        
        if not stack:
            # Can start sequence from earliest possible index
            k = min(i+1, books[i])
            dp[i] = total_sum(books[i], k)
        else:
            prev = stack[-1]
            k = min(i - prev, books[i])
            dp[i] = dp[prev] + total_sum(books[i], k)
        stack.append(i)
        result = max(result, dp[i])
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each index is pushed and popped from the stack at most once. Calculations per index are constant time.
- **Space Complexity:** O(n)  
  O(n) for dp and stack arrays, negligible extra.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your algorithm change if instead of strictly increasing, it could be non-decreasing?
  *Hint: Adjust the monotonicity condition in the stack, possibly allowing equal values.*

- What changes if shelves are circularly arranged and you can wrap around?
  *Hint: Would need to double the array and adjust segment lengths.*

- Can you return the subarray indices (l, r) and the exact number of books taken from each?
  *Hint: Track path in DP or reconstruct from stored back-pointers.*

### Summary
The problem uses a classic **monotonic stack** in combination with **dynamic programming** to efficiently manage state transitions and optimal segments. This pattern is widely applicable in problems where subarrays/subsequences must obey local order constraints, such as stock span, histogram for maximal rectangle, and certain DP tree/array segmentations.