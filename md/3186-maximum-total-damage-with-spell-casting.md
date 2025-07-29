### Leetcode 3186 (Medium): Maximum Total Damage With Spell Casting [Practice](https://leetcode.com/problems/maximum-total-damage-with-spell-casting)

### Description  
You are given an array **power**, where each element represents the damage value of a spell. Spells with the same damage can appear multiple times. If you cast a spell of damage **x**, you **cannot** cast any spell with damage **x - 2**, **x - 1**, **x + 1**, or **x + 2** (even if there are multiple copies). Each spell can only be used once. Return the **maximum total damage** you can achieve by carefully selecting spells, respecting this constraint.

### Examples  

**Example 1:**  
Input: `power = [1,1,3,4]`  
Output: `6`  
*Explanation: We can cast spells with damage 1, 1, and 4. Total = 1 + 1 + 4 = 6. We cannot use the spell of damage 3 as 1+2=3 conflicts with it.*

**Example 2:**  
Input: `power = [7,1,6,6]`  
Output: `13`  
*Explanation: Cast spells with damage 1, 6, 6 for 1+6+6=13. Picking both 6s is allowed since they are separate spells. Picking 7 would block both 6s.*

**Example 3:**  
Input: `power = [2,2,2,2,2]`  
Output: `10`  
*Explanation: All spells have damage 2, so we can take all of them (since choosing a 2 only blocks non-2s), for total 2+2+2+2+2 = 10.*

### Thought Process (as if you’re the interviewee)  
- The core idea is that **casting a spell with damage x blocks casting spells with damage values in [x-2, x-1, x+1, x+2]**.
- **Brute-force:** Try every subset of spells and check constraints, but this is exponential and too slow for larger input.
- Instead, **group spells by damage value**. Let `cnt[x]` = number of spells with value x, and sort all spell values. For each unique damage, decide how many spells to cast (all or none, as picking any x means blocking parts of the neighborhood).
- **Dynamic programming approach similar to house robber or "delete and earn":**
  - Keep track of total damage if taking a spell value vs. skipping it.
  - Sort unique damage values, and process in order:
    - If current value is more than 2 away from the last picked, add its total to dp.
    - If adjacent or close, can't take both, so pick max between skipping or taking this one.
- **States:** dp[i] = max total damage considering up to iᵗʰ unique damage value.

### Corner cases to consider  
- All spells have same damage (can take all, as picking one doesn't block others with same value).
- Only one spell (trivial).
- Spells where picking one blocks all others (e.g., 2 and 4; picking 2 blocks 4).
- Negative or very large power values (not in constraints, but good practice).
- Input size 1.
- Gaps in power values, e.g. [1, 4, 7] (none block each other).

### Solution

```python
def maximumDamage(power):
    # Count occurences of each spell damage
    from collections import Counter
    cnt = Counter(power)
    
    # Get sorted list of unique damage values
    unique = sorted(cnt.keys())
    n = len(unique)
    
    # dp[i]: max total damage using up to i-th unique damage value
    dp = [0] * (n + 1)
    
    for i in range(n):
        damage = unique[i]
        total = damage * cnt[damage]
        # Find last non-conflicting
        j = i - 1
        while j >= 0 and unique[j] >= damage - 2:
            j -= 1
        # Option 1: skip this value
        skip = dp[i]
        # Option 2: take this value, add total, and jump back to last non-conflicting value
        take = dp[j+1] + total
        dp[i+1] = max(skip, take)
    
    return dp[-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  n is number of unique spell values (≤ length of power). For each value, may scan up to n for non-conflicting index. For small n (≤ 10⁵), this is acceptable since the constraints are len(power) ≤ 10⁵, but could be improved with binary search.

- **Space Complexity:** O(n)  
  For the dp and counting spell values.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the blocked range is [x-3, x-1] instead?
  *Hint: Think about adjusting which neighbors to skip in DP.*

- Can you optimize to O(n) time?
  *Hint: Use binary search or store last non-conflicting index in advance.*

- How do you reconstruct the actual spells used for max damage?
  *Hint: Track choices in DP to backtrack selection.*

### Summary
This problem is a variation of the "House Robber" or "Delete and Earn" DP pattern, often used when selections must avoid adjacent values or value ranges. The grouping, value compression, and DP progression are widely useful in subsets, robber, and optimal selection DP problems. Problems with "can't pick adjacent or nearby values" frequently map to similar solutions.