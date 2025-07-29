### Leetcode 2739 (Easy): Total Distance Traveled [Practice](https://leetcode.com/problems/total-distance-traveled)

### Description  
Given a truck with a **main tank** and an **additional tank**, where both contain some liters of fuel, and knowing the following rules:
- The truck travels **10 km per 1 liter** of fuel.
- Whenever the truck has used up **5 liters** from the main tank, **if the additional tank has at least 1 liter left**, transfer 1 liter from the additional tank to the main tank _instantly_ (this allows the truck to keep going further).
- Repeat this as long as both tanks have fuel and the rules can be applied.
- Return the **max distance** the truck can travel.

### Examples  

**Example 1:**  
Input: `mainTank = 5, additionalTank = 10`  
Output: `60`  
*Explanation: Use 5 liters (50 km), then transfer 1 from additional tank (now 4/9), use the extra liter (10 km). In total: 6 liters \* 10 km = 60 km.*

**Example 2:**  
Input: `mainTank = 10, additionalTank = 2`  
Output: `120`  
*Explanation: Use 5 liters, transfer one (mainTank: 6/1), use next 5, transfer one (mainTank: 2/0), use last 2. Total liters used: 12. Total distance: 120 km.*

**Example 3:**  
Input: `mainTank = 8, additionalTank = 0`  
Output: `80`  
*Explanation: No extra fuel can be transferred. Use 8 liters directly. 8 \* 10 = 80 km.*

### Thought Process (as if you’re the interviewee)  
First, simulate the process: every time 5 liters from the main tank are burned and there's still fuel in the additional tank, move 1 liter over. Stop once we can't do this anymore.
- **Brute force:** Simulate using a while-loop, decrementing as we go, but this approach is a bit slow and unnecessary.
- **Optimization:** 
  - For every 5 liters used, **1 transfer** can be done (as long as additional tank is not empty).
  - The number of such transfers is the minimum of ⌊(mainTank-1)/4⌋ and additionalTank.
    - Why ⌊(mainTank-1)/4⌋? The last 5-liter chunk needs only 4 or less to prevent over-transfer.
  - The final answer is: **(mainTank + effective_transfers) \* 10**

Chose the math-based closed formula for speed and readability.

### Corner cases to consider  
- mainTank = 0 (truck cannot move)
- additionalTank = 0 (no transfer, just mainTank fuel)
- mainTank < 5 (transfer can't happen)
- Each transfer can only occur if additionalTank > 0 at that moment.

### Solution

```python
def distanceTraveled(mainTank: int, additionalTank: int) -> int:
    # Compute how many transfers can be made: Each transfer occurs every 5 liters,
    # but the last chunk may be smaller. Transfers cannot exceed available fuel in additionalTank.
    transfers = min((mainTank - 1) // 4, additionalTank) if mainTank >= 5 else 0
    return (mainTank + transfers) * 10
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1), as all calculations are done in constant time using arithmetic.
- **Space Complexity:** O(1), only a constant number of variables are used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if transfer happens for every X liters, not just 5?  
  *Hint: Can your formula generalize for any transfer interval?*

- What if mainTank or additionalTank refills on the way?  
  *Hint: How would you simulate periodic refuels mid-route?*

- How would you track exactly at which distances the transfers happen?  
  *Hint: You might need to keep a step-by-step log of positions.*

### Summary
This problem demonstrates a classic **simulation with step optimization**: you can often replace a loop with a mathematical formula if you analyze the pattern. Here, the transfer pattern is regular, so we use division and min to get the answer efficiently. This technique applies to many resource-simulation or refueling patterns, and is common in greedy, math, and simulation interview problems.