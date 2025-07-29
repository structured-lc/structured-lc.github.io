### Leetcode 2591 (Easy): Distribute Money to Maximum Children [Practice](https://leetcode.com/problems/distribute-money-to-maximum-children)

### Description  
You are given two integers, **money** and **children**.  
- **money**: Total amount of money to distribute (in whole dollars).
- **children**: Number of children present.

Your task is to distribute all the money such that:
- Each child gets **at least 1 dollar**.
- **No child can get exactly 4 dollars.**
- You must maximize the number of children who get **exactly 8 dollars**.

Return the maximum number of children who can each receive exactly 8 dollars according to these rules. If it's not possible to distribute the money this way, return -1.

### Examples  

**Example 1:**  
Input: `money = 20, children = 3`  
Output: `1`  
*Explanation:  
Give 8 dollars to one child, 9 dollars to another, and 3 dollars to the third.  
No way to give more than one child exactly 8 dollars (due to remaining constraints).*

**Example 2:**  
Input: `money = 16, children = 2`  
Output: `2`  
*Explanation:  
Give 8 dollars to both children. 8 + 8 = 16.*

**Example 3:**  
Input: `money = 17, children = 2`  
Output: `-1`  
*Explanation:  
Each child must get at least 1. If you try 8 + 9 = 17, but then one gets 9, not allowed.  
If you try 7 + 10 = 17, but now no child gets 8, so not maximizing.  
Can't distribute such that anyone gets 4 or leaves leftover.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Give each child at least $1 (since it's mandatory). Distribute the remaining money in different combinations, count how many can get exactly $8, and avoid giving any $4. Try all possibilities.
  - This is very inefficient, as distributing among up to 30 children and 200 dollars yields a huge search space.

- **Optimization:**  
  Since every child must get at least $1, subtract `children` from `money` to get `remaining_money`.  
  Each time you want to give a child 8 dollars, you actually give 7 extra (after the initial 1).  
  So, try to maximize the number of children `k` getting exactly 8 dollars: subtract 7 × k from the `remaining_money` and check:
    - The rest of the children each get 1 dollar plus (possibly) some of the left over, but nobody should receive exactly 4.
    - Some cases (like just 1 child left and 4 dollars left) are forbidden. Make sure such configurations are not created.

- **Key checks:**  
  For each possible integer k (from min(children, money // 8) down to 0), check:
    - Is it possible to assign the remaining money among (children - k) children, while giving each at least 1 and nobody exactly $4?
      - Watch out for edge cases: e.g. if one child would be forced to get 4 dollars.

- **Why Greedy?**  
  Always try for the highest possible `k`, because the prompt wants the biggest possible count of children with exactly 8.

### Corner cases to consider  
- money < children (impossible to give each at least $1)
- money == children × 8 (can all get 8)
- Remaining money forces exactly one child to get 4 dollars
- Only 1 child or large numbers
- Edge cases with minimal or maximal values (money = 1, children = 2, etc.)
- Surplus money can't be evenly split without violating rule on 4 dollars

### Solution

```python
def distMoney(money: int, children: int) -> int:
    # Every child must get at least $1
    if money < children:
        return -1

    # Try the maximum number of kids that could get 8, going down
    for k in range(min(money // 8, children), -1, -1):
        # Give 8 dollars to k kids
        rem_money = money - k * 8
        rem_kids = children - k

        # Each child needs at least $1
        if rem_money < rem_kids:
            continue  # Not enough for the rest

        # If only 1 kid left and rem_money == 4, skip (forbidden)
        if rem_kids == 1 and rem_money == 4:
            continue

        # If k == children - 1, and rem_money == 4 (last kid gets 4), skip
        if k == children - 1 and rem_money == 4:
            continue

        # Otherwise valid
        return k

    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(children) — We iterate at most `children` times (from max possible k down to 0).
- **Space Complexity:** O(1): All computations are constant space, no extra storage except variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the forbidden dollar amount is dynamic (not just 4)?
  *Hint: Generalize the check for forbidden allocation — pass a parameter, check for other values.*

- What if you want to maximize children getting some other fixed amount (like 10 dollars) instead of 8?
  *Hint: Parameterize the 'target' and adjust base/gap accordingly for the optimization logic.*

- What if children could get fractional dollars (cents allowed)?
  *Hint: Solution turns into a linear programming problem, or greedy partitioning with constraints for forbidden values.*

### Summary
The problem uses a **greedy + constructive** approach:  
- Iteratively try the largest feasible number of children to get exactly 8 dollars by distributing 8 dollars as much as possible and checking constraints for the rest.
- Pattern closely relates to greedy maximization with direct feasibility checking/early rejection — useful in constrained splitting/partitioning problems, such as fair share allocation with forbidden amounts.