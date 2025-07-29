### Leetcode 2137 (Medium): Pour Water Between Buckets to Make Water Levels Equal [Practice](https://leetcode.com/problems/pour-water-between-buckets-to-make-water-levels-equal)

### Description  
Given an array of buckets, where the iᵗʰ bucket contains a certain amount of water, and a percentage loss occurs each time you pour water from one bucket into another, find the **maximum possible water level** (as a floating point value) that can be achieved in all buckets, by pouring water between them any number of times, so their final water levels are as equal as possible.
If pouring k gallons, `loss` percent is lost each time (you only “receive” k × (1 - loss/100)), with no limit on the number of pours.
The answer must be precise within 1e-5.

### Examples  

**Example 1:**  
Input: `buckets = [5, 2, 3], loss = 0`  
Output: `3.33333`  
*Explanation: No pouring loss, so you can simply average: (5+2+3)/3 = 10/3 = 3.33333.*

**Example 2:**  
Input: `buckets = [5, 2, 3], loss = 50`  
Output: `2.50000`  
*Explanation: With 50% loss, you cannot bring higher buckets as low as you could before—some water is wasted in pouring.*

**Example 3:**  
Input: `buckets = [0, 0, 10], loss = 30`  
Output: `3.65445`  
*Explanation: With 30% loss, bringing the 10 down to match the others results in some water lost at each pour, so the highest achievable equal amount is a bit less than the average.*

### Thought Process (as if you’re the interviewee)  
Start with the brute-force idea:  
- If loss = 0, this is just distributing total water evenly: simple average.
- If there’s a loss, pouring water for evening out means some water is wasted. The higher the loss, the **less you can equalize**.  
- To find the answer, imagine simulating the pouring many different ways — but since any water you remove from fuller buckets arrives at others multiplied by (100 - loss)/100, the final level you can achieve is ultimately a function of the initial distribution and the loss rate.

Optimize:  
- Instead of simulating every pour, notice this is a **binary search on the answer**!  
- For a given target level x, check: can we reach x in every bucket by only transferring water (allowing for loss)?  
  - Total amount above x (excess) in fuller buckets is “poured down,” but due to loss, only (100 - loss)% gets delivered and can be used to fill lower buckets.  
  - See if sum of all sold “above” x, times transfer rate, is enough to make up the “shortfall” below x.  
- Binary search the feasible value x in [0, max(buckets)], using this check.  
- This works efficiently because the function is monotonic: higher x needs more, so if possible, try higher, else lower.

Trade-offs:  
- Naive simulation is too slow.  
- Binary search gives O(n log(range/precision)) performance and handles precision as needed.

### Corner cases to consider  
- All buckets already equal: no moves needed.
- Empty bucket(s) and no water in others: answer is 0.0.
- loss = 0: just average.
- 100% loss: no pouring possible, answer is the **minimum** bucket.
- 0 or 1 bucket: edge conditions.
- Large values or precision issues.

### Solution

```python
def equalizeWater(buckets, loss):
    # Binary search to find maximum level achievable
    n = len(buckets)
    left, right = 0.0, max(buckets)
    transfer = (100 - loss) / 100

    def can_achieve(target):
        excess = 0.0  # total amount above target (to be given out)
        needed = 0.0  # total needed to bring buckets up to target
        for b in buckets:
            if b > target:
                # Can donate (b - target)
                excess += b - target
            else:
                # Needs to receive (target - b)
                needed += target - b
        # Only transfer*excess makes it to other buckets
        return transfer * excess >= needed

    # required precision for the answer
    eps = 1e-6
    while right - left > eps:
        mid = (left + right) / 2
        if can_achieve(mid):
            left = mid  # try for higher possible level
        else:
            right = mid
    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log (max value / 1e-5))  
  Each binary search step checks all n buckets, and log(10⁶ / 1e-5) ≈ 35–40 steps if input values are up to a million (typical).
- **Space Complexity:** O(1) extra, besides input — just a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt the solution if the loss can be different between bucket pairs?  
  *Hint: You’d need a graph model and possibly flows instead of binary search.*

- Can you return the actual final water distribution, not just the level?  
  *Hint: Trace transfers per bucket as you simulate pouring up to the binary search answer.*

- What if you must minimize the **number** of pours/moves as well?  
  *Hint: Greedy or queue-based state approaches might be needed, beyond computing the maximum possible level.*

### Summary
This problem demonstrates an advanced use of **binary search on real numbers**, a key pattern for precision-based decisions on a monotonic property. The reasoning is similar to other “maximize minimum X” or “minimize maximum difference” bucket problems, including load balancing and resource splitting — making this technique widely applicable in interviews and algorithmic optimization tasks.