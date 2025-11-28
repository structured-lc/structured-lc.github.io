### Leetcode 3021 (Medium): Alice and Bob Playing Flower Game [Practice](https://leetcode.com/problems/alice-and-bob-playing-flower-game)

### Description  
Given two numbers, n and m, representing two groups of flowers arranged in a circle between Alice and Bob:
- Alice starts. On each turn, a player picks 1 flower, either clockwise from Alice (x) or anti-clockwise from Bob (y).
- The player who picks the last flower "captures" the other player and wins.
- The game starts with `x` flowers in the clockwise direction (1 ≤ x ≤ n) and `y` flowers anti-clockwise (1 ≤ y ≤ m).
- Find the **number of unique (x, y) starting pairs where Alice can guarantee a win**, regardless of how the game is played.

### Examples  

**Example 1:**  
Input: `n = 1, m = 1`  
Output: `1`  
*Explanation: Only possible pair is (1, 1). Total = 2 flowers (even), so Alice cannot guarantee a win.*

**Example 2:**  
Input: `n = 2, m = 3`  
Output: `3`  
*Explanation: Possible (x, y) pairs: (1,1),(1,2),(1,3),(2,1),(2,2),(2,3). For each, compute x+y. Alice wins if the total is odd:
- (1,1): 2 (even) → Bob wins  
- (1,2): 3 (odd) → Alice wins  
- (1,3): 4 (even) → Bob wins  
- (2,1): 3 (odd) → Alice wins  
- (2,2): 4 (even) → Bob wins  
- (2,3): 5 (odd) → Alice wins  
Final answer: 3 winning pairs for Alice.*

**Example 3:**  
Input: `n = 2, m = 2`  
Output: `2`  
*Explanation: (1,1): 2 (even), (1,2): 3 (odd), (2,1): 3 (odd), (2,2): 4 (even). Alice wins on (1,2) and (2,1).*

### Thought Process (as if you’re the interviewee)  

Initially, you might simulate picking flowers for each possible (x, y), but that’s too slow for larger n and m.

Notice that who wins is determined by the **total number of flowers picked = x + y**:
- If x + y is **odd**: Alice takes the last flower (since she moves first).
- If x + y is **even**: Bob takes the last flower.

So, for each 1 ≤ x ≤ n and 1 ≤ y ≤ m, count the pairs where x + y is odd.

Brute force is O(n\*m), but we can optimize by **counting how many x are odd/even** and same for y.
- For each x, count how many y will make x+y odd.

For example, number of odd x: n//2 + n%2; number of even x: n//2.
Same for y.

- Alice wins if (odd x, even y) or (even x, odd y).

So, answer = (num_odd_x × num_even_y) + (num_even_x × num_odd_y)

### Corner cases to consider  
- n or m is 1 (minimal size, test possible pairs explicitly)
- Both n and m are even or both are odd
- Very large n, m (ensure no overflow)
- n or m is zero (invalid per constraints, but should be guarded in robust code)

### Solution

```python
def flowerGame(n: int, m: int) -> int:
    # Count odds and evens for x (1 to n), and y (1 to m)
    odd_n = n // 2 + n % 2        # Number of odd x
    even_n = n // 2               # Number of even x
    odd_m = m // 2 + m % 2        # Number of odd y
    even_m = m // 2               # Number of even y

    # Alice wins if x+y is odd: (odd x, even y) + (even x, odd y)
    return odd_n * even_m + even_n * odd_m
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). Only arithmetic and division steps. No iteration over n or m.
- **Space Complexity:** O(1). Only uses a few integer variables, no extra storage depending on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- If Alice gets to choose n and m, which values maximize her winning pairs?
  *Hint: Alice wants n and m to be close to maximize (odd × even + even × odd).*

- If we change rules so Alice can pick more than 1 flower per turn, how does the logic change?
  *Hint: Consider Grundy numbers / game theory for variable moves.*

- If the game is played on a non-circular arrangement, how does the answer change?
  *Hint: Re-express the mapping of moves and who takes the last flower.*

### Summary
This problem is a classic **parity/game theory** problem — the winner depends only on odd/even sums, not move sequence. It uses **counting based on parity** (odd/even split), which appears in other problems about games, intervals, or pairs with sum properties. The optimized approach is very efficient, turning an O(n\*m) simulation into O(1) by recognizing parity patterns.


### Flashcard
Alice and Bob Playing Flower Game (Medium)

### Tags
Math(#math)

### Similar Problems
