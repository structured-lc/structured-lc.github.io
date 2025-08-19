### Leetcode 2525 (Easy): Categorize Box According to Criteria [Practice](https://leetcode.com/problems/categorize-box-according-to-criteria)

### Description  
Given the **length**, **width**, **height** (all in millimeters), and **mass** (in kilograms) of a box, you must classify the box into one of four categories based on these rules:
- A box is **Bulky** if **any** dimension is **≥ 10,000 mm** *or* its **volume** is **≥ 1,000,000,000 mm³**.
- A box is **Heavy** if its **mass** is **≥ 100 kg**.
- Return:
  - **"Both"** if it's both Bulky and Heavy.
  - **"Bulky"** if only Bulky.
  - **"Heavy"** if only Heavy.
  - **"Neither"** if neither condition is met.

### Examples  

**Example 1:**  
Input: `length=1000, width=1000, height=1000, mass=10`  
Output: `Bulky`  
*Explanation: The volume = 1000×1000×1000 = 1,000,000,000 (equals threshold), so box is Bulky. Mass < 100, so not Heavy.*

**Example 2:**  
Input: `length=100, width=100, height=100, mass=200`  
Output: `Heavy`  
*Explanation: All dimensions < 10,000 and volume = 1,000,000 < 1,000,000,000. Mass = 200 ≥ 100, so Heavy only.*

**Example 3:**  
Input: `length=10000, width=10000, height=10000, mass=100`  
Output: `Both`  
*Explanation: Each dimension is at the threshold for "Bulky". Mass = 100, so meets "Heavy".*

### Thought Process (as if you’re the interviewee)  
First, identify the main criteria separately—"Bulky" depends on dimensions and volume, "Heavy" depends on mass.  
I'd compute the volume, then check if any dimension ≥ 10,000 or the volume ≥ 1,000,000,000 to mark Bulky.  
Check if mass ≥ 100 to mark Heavy.  
Then, according to which conditions are met, choose from {"Neither", "Bulky", "Heavy", "Both"}.  
Brute force would check all conditions directly; since there are only four inputs and fixed thresholds, this is efficient enough.  
The optimal approach is a series of if-else checks; extra efficiency isn’t needed.  

### Corner cases to consider  
- Dimensions or mass exactly equal to their threshold values (10,000 mm, 1,000,000,000 mm³, 100 kg).
- Multiple dimensions meeting threshold, but not all.
- Mass is just below threshold, but dimensions are Bulky (and vice versa).
- All dimensions and mass are below thresholds.
- Extremely large numbers (potential integer overflow in other languages).
- One dimension huge, others small (still "Bulky").
- Zero dimension (may be illegal, but should be handled gracefully).

### Solution

```python
def categorizeBox(length, width, height, mass):
    # Compute the volume
    volume = length * width * height

    # Check for Bulky condition
    is_bulky = (
        length >= 10_000 or 
        width >= 10_000 or 
        height >= 10_000 or 
        volume >= 1_000_000_000
    )

    # Check for Heavy condition
    is_heavy = mass >= 100

    # Decide category based on conditions
    if is_bulky and is_heavy:
        return "Both"
    if is_bulky:
        return "Bulky"
    if is_heavy:
        return "Heavy"
    return "Neither"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1), because the logic consists of a few arithmetic operations and conditionals—no loops or recursion.
- **Space Complexity:** O(1), as only a fixed number of variables are used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle cases where the input units are different (e.g., centimeters, kilograms, meters)?  
  *Hint: Think about unit conversion before performing threshold checks.*

- If some constraints changed (e.g., thresholds were dynamic—not hardcoded), how would you generalize your solution?  
  *Hint: Accept threshold values as function parameters.*

- Could you make the solution robust if given floating-point inputs or validate negative/zero values for dimensions or mass?  
  *Hint: Add input validation and consider type conversions.*

### Summary
This is a classic **if-else condition classification problem** with multiple independent criteria, a common pattern in coding interviews.  
The pattern applies to problems where multiple flags or conditions combine for output decision. Common elsewhere in rule engines or permission/gatekeeping logic.  
Simple to code, yet highlights precision and careful boundary checking for interview evaluation.

### Tags
Math(#math)

### Similar Problems
- Fizz Buzz(fizz-buzz) (Easy)
- Find Winner on a Tic Tac Toe Game(find-winner-on-a-tic-tac-toe-game) (Easy)
- Best Poker Hand(best-poker-hand) (Easy)