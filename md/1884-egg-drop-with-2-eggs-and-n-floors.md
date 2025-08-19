### Leetcode 1884 (Medium): Egg Drop With 2 Eggs and N Floors [Practice](https://leetcode.com/problems/egg-drop-with-2-eggs-and-n-floors)

### Description  
Given **2 eggs** and **n floors**, you need to determine the minimum number of moves required (in the worst case) to find out the *highest* floor from which you can drop an egg without it breaking.   
You may drop an egg from any floor.  
If the egg survives a drop, you can reuse it. If it breaks, that egg is permanently gone.  
Your objective: **Minimize the maximal number of drops needed to guarantee finding the critical floor regardless of which floor it is.**

---

### Examples  

**Example 1:**  
Input: `n = 2`  
Output: `2`  
*Explanation: Drop first egg from floor 1. If it breaks, try floor 0 with the second egg. If it doesn't, go to floor 2. Two moves suffice in either case.*

**Example 2:**  
Input: `n = 10`  
Output: `4`  
*Explanation: Drop first egg from floor 4 (if breaks: check 1-3 one-by-one with second egg). If not, go to 7 (i.e: 4 + 3), then 9 (7 + 2), then 10 (last one). At most 4 moves in any scenario.*

**Example 3:**  
Input: `n = 100`  
Output: `14`  
*Explanation: With optimal dropping sequence, 14 moves guarantee finding the exact floor: choose x where x + (x–1) + … + 1 ≥ 100 ⇒ x = 14. (See below for steps reasoning.)*

---

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - With one egg: check 1, 2, …, n (takes n drops – not efficient).  
  - With two eggs, could try every possible way to split, but that's complicated and too slow.

- **Optimal (Mathematical) insight:**  
  - Use the **first egg to reduce the search space** by dropping at strategic intervals (not every floor!).  
  - Suppose you have k moves; can you cover n floors?  
    - Drop first egg from floor x₁, then x₂ = x₁ + (x₁–1), then x₃ = x₂ + (x₁–2), and so on—decrease the gap by 1 each time.  
    - Total floors covered in k moves: k + (k–1) + (k–2) + ... + 1 = k(k+1)/2.  
    - Find minimal k such that k(k+1)/2 ≥ n.

- **Why this works:**  
  - If first egg breaks at the iᵗʰ drop, use the second egg linearly on the interval below (never more than k moves).
  - Guarantees you never exceed k moves in the worst case.

- **Trade-off:** Powerful, direct approach—constant space and quick computation.


---

### Corner cases to consider  
- n = 1 (only one floor)
- n = 0 (no floors)
- n where k(k+1)/2 == n (perfect triangle number; check computation for boundary)
- Small n like 2 or 3
- n = Large number (performance for big n, e.g., 10**6)
- n = very large and the optimal k is close to sqrt(2n)

---

### Solution

```python
def twoEggDrop(n: int) -> int:
    # We want the minimum k such that k*(k+1)//2 >= n
    k = 1
    total = 0
    while total < n:
        total += k
        k += 1
    return k - 1
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(√n)  
  - Each loop iteration increases total by k. Since k(k+1)/2 ≥ n, loop runs up to about √(2n) times.

- **Space Complexity:** O(1)  
  - Only a few variables used; no extra storage.

---

### Potential follow-up questions (as if you’re the interviewer)  

- If you have **k eggs** (not just two), how does the strategy change?  
  *Hint: Think about DP or generalized triangle numbers.*

- Can you return the **actual sequence of floors** to drop from?  
  *Hint: Store each drop position as you calculate it.*

- What if *breaking* an egg is costlier than *not* breaking one?  
  *Hint: Introduce a weighted cost model per outcome.*

---

### Summary
This is a classic **minimax search with limited resources**—a major interview pattern.  
The core idea leverages **math to minimize worst-case moves** by reducing potential failure range at each step.  
This strategy appears in variants: general egg drop, finding critical thresholds, and optimizing search with constraints.  
You could apply this approach for related real-world problems like circuit testing, breakpoints, or adversarial minimax.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Super Egg Drop(super-egg-drop) (Hard)