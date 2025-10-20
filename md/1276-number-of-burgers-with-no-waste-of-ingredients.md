### Leetcode 1276 (Medium): Number of Burgers with No Waste of Ingredients [Practice](https://leetcode.com/problems/number-of-burgers-with-no-waste-of-ingredients)

### Description  
You are given the total number of **tomato slices** and **cheese slices** available.  
There are 2 types of burgers:
- **Jumbo Burger**: Needs 4 tomato slices and 1 cheese slice.
- **Small Burger**: Needs 2 tomato slices and 1 cheese slice.

You must use up every tomato and cheese slice with **no waste**.  
Return `[number_of_jumbo_burgers, number_of_small_burgers]`.  
If it is **impossible** to use all ingredients without leftovers, return `[]`.

---

### Examples  

**Example 1:**  
Input: `tomatoSlices=16, cheeseSlices=7`  
Output: `[1,6]`  
*Explanation: 1 jumbo (4 × 1=4 tomato, 1 cheese), 6 small (2 × 6=12 tomato, 6 cheese), so 4+12=16 tomato, 1+6=7 cheese. All ingredients used, so answer is [1,6].*

**Example 2:**  
Input: `tomatoSlices=17, cheeseSlices=4`  
Output: `[]`  
*Explanation: No combination of 4’s and 2’s gives 17, so impossible.*

**Example 3:**  
Input: `tomatoSlices=4, cheeseSlices=17`  
Output: `[]`  
*Explanation: Not enough tomato for 17 cheese slices.*

---

### Thought Process (as if you’re the interviewee)  

- The brute-force way: Try all possible numbers of jumbo burgers (0 to min by tomato/4 and cheese), and see if a matching number of small burgers exists to use all ingredients.

- Let's formalize:
    - If x = jumbo burgers, y = small burgers, then:
        - 4×x + 2×y = tomatoSlices
        - x + y = cheeseSlices

- Solve for x and y:
    - From the second equation: y = cheeseSlices - x
    - Substitute into the first equation:
        - 4×x + 2×(cheeseSlices - x) = tomatoSlices
        - 4x + 2cheeseSlices - 2x = tomatoSlices
        - 2x = tomatoSlices - 2×cheeseSlices
        - x = (tomatoSlices - 2×cheeseSlices) ÷ 2
    - y = cheeseSlices - x

- Key: Both x and y must be integers, ≥ 0. If not, answer is impossible.

- This approach is algebraic, fast, and avoids enumeration.

---

### Corner cases to consider  
- tomatoSlices or cheeseSlices are zero.
- tomatoSlices is odd (can’t split with only 2’s and 4’s).
- tomatoSlices < 2×cheeseSlices (minimum possible with only small burgers).
- tomatoSlices > 4×cheeseSlices (impossible: not enough tomato for max jumbo).
- Negative result for x or y.
- Large values (overflow/handling).

---

### Solution

```python
def numOfBurgers(tomatoSlices: int, cheeseSlices: int):
    # Each jumbo: 4 tomato, 1 cheese
    # Each small: 2 tomato, 1 cheese
    # Let x = jumbo, y = small

    # x = (tomatoSlices - 2 * cheeseSlices) // 2
    # y = cheeseSlices - x

    # If tomatoSlices or cheeseSlices invalid, there will be negative answers or not integer
    if tomatoSlices < 2 * cheeseSlices:
        return []
    if tomatoSlices > 4 * cheeseSlices:
        return []
    if tomatoSlices % 2 != 0:
        return []

    x = (tomatoSlices - 2 * cheeseSlices) // 2
    y = cheeseSlices - x

    if x < 0 or y < 0:
        return []
    return [x, y]
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — All steps are simple arithmetic, independent of input size.
- **Space Complexity:** O(1) — No extra storage used, just variables.

---

### Potential follow-up questions (as if you’re the interviewer)  

- Can you write the solution if there was a third burger type?  
  *Hint: Set up a system of equations for every type, and solve for non-negative integer solutions.*

- What happens if some waste is allowed (not all slices must be used)?  
  *Hint: Try all possible counts and minimize waste using modulo/arithmetic.*

- How to generalize for any set of burger types/ingredients?  
  *Hint: Treat as an integer linear programming problem.*

---

### Summary
This problem is a classic system of equations scenario, solved via algebraic manipulation and validity checks.  
This “simultaneous equations with item counts” pattern is common in resource allocation, coin change, and combination problems.  
It highlights translating real-world constraints into equations, and quickly testing solution validity.


### Flashcard
Solve equations 4×x+2×y=tomatoSlices and x+y=cheeseSlices for integer x,y≥0; return [x, y] if valid, else [].

### Tags
Math(#math)

### Similar Problems
