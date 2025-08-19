### Leetcode 1716 (Easy): Calculate Money in Leetcode Bank [Practice](https://leetcode.com/problems/calculate-money-in-leetcode-bank)

### Description  
Given n days, a person deposits money into a bank every day following a specific pattern:
- On the first Monday, he deposits \$1.
- From Tuesday to Sunday of that week, each day he deposits \$1 more than the previous day, so the amounts for the first week are 1, 2, 3, 4, 5, 6, 7.
- Each subsequent Monday, he increases his deposit by \$1 compared to the previous Monday (2, 3, ...), and for that week, he keeps increasing by 1 each day.

Given an integer n, calculate the total money saved after n days.

### Examples  

**Example 1:**  
Input: `n = 4`  
Output: `10`  
*Explanation: Deposits are 1, 2, 3, 4 (Mon–Thu).*

**Example 2:**  
Input: `n = 10`  
Output: `37`  
*Explanation: First 7 days: 1,2,3,4,5,6,7 (sum=28). Next 3 days (start next Monday): 2,3,4 (sum=9). Total = 28+9=37.*

**Example 3:**  
Input: `n = 20`  
Output: `96`  
*Explanation: Weeks:*
- *Week 1: 1,2,3,4,5,6,7 (sum=28)*
- *Week 2: 2,3,4,5,6,7,8 (sum=35)*
- *Next 6 days: 3,4,5,6,7,8 (sum=33)*
- *Total = 28+35+33=96*

### Thought Process (as if you’re the interviewee)  
First, I’d simulate the saving process day-by-day. For each day, keep track of which week and which day of the week we’re on, and sum the deposits. This is fine for small n, but it’s not efficient if n is large.

On closer inspection, the process is made of full weeks (7 days), with a possible partial week at the end. For each week, the Monday deposit increases by 1. We can use the arithmetic series sum to compute the total for all full weeks efficiently:
- The kᵗʰ week starts depositing k dollars on Monday and increases by 1 each day.
- For each full week, sum = 7 × week's starting deposit + sum of [0 to 6], which is just an arithmetic progression.

To optimize:
1. Compute the number of complete weeks: w = n // 7
2. For all full weeks: sum = w × (initial week sum + final week sum) // 2, where initial = 1st week, final = (1 + w - 1) (since Monday's amount increases by 1 per week)
3. For the remaining days: sum individually as (week_start + i) for i in 0..(n % 7 - 1)

Math helps us get O(1) time.

### Corner cases to consider  
- n < 7 (partial week, no complete weeks)
- n = 0 (no saving, should return 0)
- n is an exact multiple of 7 (no partial week at end)
- Very large n
- n = 1 (only Monday’s deposit)

### Solution

```python
def totalMoney(n):
    # Number of complete weeks
    weeks = n // 7
    # Remaining days after full weeks
    days = n % 7

    # Sum for all full weeks:
    # Each week starts at (1 + week_idx) and the week sum is: start + (start+1) + ... + (start+6)
    # So, for kᵗʰ week, sum = 7*start + (0+1+2+3+4+5+6) = 7*start + 21
    # But since start increases by 1 each week, total sum is well-represented by:
    # Total full week sum = 7 * (sum of first week_starting deposits)
    full_week_sum = 0
    for w in range(weeks):
        # Week start is 1+w, days: (1+w),(2+w),...(7+w)
        full_week_sum += 7 * (1 + w) + sum(range(7))

    # Or more mathematically, as arithmetic series:
    # For all full weeks, sum = 7*(weeks*(weeks+1))//2

    # Sum for the remaining days (starts at 1+weeks and increases each day)
    rem_sum = 0
    for d in range(days):
        rem_sum += (1 + weeks) + d

    return full_week_sum + rem_sum
```

#### Optimized (math formula only, no loops):

```python
def totalMoney(n):
    weeks = n // 7
    days = n % 7

    # Sum for all full weeks: 7 × sum of (1 + 2 + ... + weeks)
    week_sum = 7 * weeks * (weeks + 1) // 2
    # For leftover days: each day starts at 1+weeks, increases by 1
    day_sum = days * (2 * (weeks + 1) + (days - 1)) // 2
    return week_sum + day_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). All calculations use closed formulas with no loops over n.  
- **Space Complexity:** O(1). Uses a constant amount of extra space (only primitive variables).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of days n is extremely large (e.g., beyond 64-bit int)?
  *Hint: Would integer overflow or floating point precision be a concern?*

- How would you generalize the formula if the deposit starts from an arbitrary amount, not \$1?
  *Hint: Where does the initial value figure into the week summation?*

- If the per-day increment is different for each week (e.g., one week you increase by 2 per day, another by 1), how would you handle that?
  *Hint: Can you express each week’s series with its own increment?*

### Summary
This problem uses the **arithmetic progression** formula to aggregate repeated patterns efficiently, converting a row-by-row simulation into closed-form O(1) math. Such series tricks are common in problems with regular increments or sequences and appear in other “total after N days” or “repeating cycle” sum problems. Recognizing the step pattern and reducing repeated computation is the key pattern here.

### Tags
Math(#math)

### Similar Problems
- Distribute Money to Maximum Children(distribute-money-to-maximum-children) (Easy)