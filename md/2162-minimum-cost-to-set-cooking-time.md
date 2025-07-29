### Leetcode 2162 (Medium): Minimum Cost to Set Cooking Time [Practice](https://leetcode.com/problems/minimum-cost-to-set-cooking-time)

### Description  
You are given a microwave that lets you input a 4-digit time, interpreted as MMSS (minutes and seconds). Valid MMSS values represent 0 ≤ minutes ≤ 99, 0 ≤ seconds ≤ 99. To set the desired cooking time (in seconds), you can choose any combination of minutes and seconds that sums to that duration, within the valid digit constraints.

You start with your finger on a digit (`startAt`). Moving your finger to a different digit costs `moveCost`, and pressing any digit costs `pushCost`. Each sequence of button presses encodes the four digits (some leading zeros may be skipped) required to set the time. The goal is to find the **minimum total cost** required to set the microwave to cook for `targetSeconds`.

### Examples  

**Example 1:**  
Input: `startAt=1`, `moveCost=2`, `pushCost=1`, `targetSeconds=600`  
Output: `6`  
*Explanation: 600 seconds = 10 minutes, so sequence is 1 0 0 0 (or just 1 0 0), minimal cost is: move to '1' (if not already at '1'), push, move to '0', push x2.*

**Example 2:**  
Input: `startAt=0`, `moveCost=1`, `pushCost=2`, `targetSeconds=76`  
Output: `6`  
*Explanation: 76 seconds = 1 minute 16 seconds (01:16) or 76 seconds (00:76, which is valid). Most optimal input is 1 1 6: move to '1', push, move to '1', push, move to '6', push, total cost 6.*

**Example 3:**  
Input: `startAt=9`, `moveCost=100`, `pushCost=1`, `targetSeconds=1`  
Output: `2`  
*Explanation: 1 second can be set by pushing '1' (move from '9' to '1': 100, plus push once), so cost is 100 + 1 = 101, but optimal is to input '0' then '1' (since starting from '9', need to move to '0', push, then move to '1', push: 100+1 + 100+1 = 202). But pressing only '1' is equivalent as no leading zero needed. Minimum cost is 101.*

### Thought Process (as if you’re the interviewee)  

First, convert `targetSeconds` into all possible valid (minutes, seconds) combinations such that:
- 0 ≤ minutes ≤ 99
- 0 ≤ seconds ≤ 99
- minutes \* 60 + seconds == targetSeconds

For each valid (m,s) pair, create the 4-digit sequence to input (some leading zeros can be omitted), then calculate the cost to press those digits from `startAt` using moveCost and pushCost.
- For each digit in the resulting sequence:
  - If finger is on the correct digit, add `pushCost`
  - If finger needs to move, add `moveCost + pushCost`
- Keep the minimum of all possible cost combinations.

Naive brute-force is fine because possible combinations are small (minutes: 0–99, seconds: 0–99). Check both:
- `minutes = targetSeconds // 60`, `seconds = targetSeconds % 60`
- If `minutes > 0` and `seconds + 60 ≤ 99`, check `minutes-1` and `seconds+60` as an alternative valid entry with fewer digits (less cost).

Choose the sequence with the lowest total cost.

### Corner cases to consider  
- targetSeconds < 100 (might be set with 2 digits)
- targetSeconds can be set as either (m, s) or (m-1, s+60) (possibly fewer zeros)
- StartAt may be same as first digit or not
- Digits with repeated values (no move cost between them)
- Case where `moveCost` is 0 or `pushCost` is 0
- targetSeconds is close to maximum/minimum valid values
- Leading zeros cases: minimal digits pressed but still valid

### Solution

```python
def minCostSetTime(startAt, moveCost, pushCost, targetSeconds):
    def get_cost(start, digits):
        # Remove leading zeros (must have at least 1 digit)
        idx = 0
        while idx < len(digits)-1 and digits[idx] == 0:
            idx += 1
        res = 0
        curr = start
        for d in digits[idx:]:
            if curr != d:
                res += moveCost
                curr = d
            res += pushCost
        return res

    min_cost = float('inf')
    # Try two possible `(min, sec)` settings
    for m in range(0, 100):
        s = targetSeconds - m * 60
        if 0 <= s < 100:
            # Input has 4 digits: [m//10, m%10, s//10, s%10]
            digits = [m // 10, m % 10, s // 10, s % 10]
            cost = get_cost(startAt, digits)
            min_cost = min(min_cost, cost)
    return min_cost
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). The maximum number of possible (m, s) pairs to consider is 100, and each takes constant time to evaluate.
- **Space Complexity:** O(1). Only scalar variables and fixed-size lists (max size 4) are used; no significant extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the microwave allowed up to 6 input digits for hours:minutes:seconds?
  *Hint: How would you generalize the iteration and digit grouping?*

- What if each digit button had a unique moveCost instead of uniform?
  *Hint: How would you track the previous finger position and cost to move between any two digits?*

- What if the startAt digit could be any digit, not just 0-9?
  *Hint: Consider how to initialize the finger position and handle out-of-range cases.*

### Summary
This approach uses a brute-force enumeration of all possible valid minute/second splits for the target, then for each, simulates the digit entry with costs according to movement and pushing. It leverages the small constraints for an exhaustive check and careful cost calculation, which is a recurring pattern in UI simulation and minimum cost path problems. Variations appear in PIN pad simulations, elevator problems, and number-entry problems with movement/press costs.