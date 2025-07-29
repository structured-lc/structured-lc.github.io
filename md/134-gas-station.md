### Leetcode 134 (Medium): Gas Station [Practice](https://leetcode.com/problems/gas-station)

### Description  
You are given two integer arrays **gas** and **cost**, both of length n. Each gas[i] represents the amount of gas available at the iᵗʰ station, and cost[i] is the gas required to travel from the iᵗʰ station to the next. The stations form a circular route.

You must find the *starting gas station index* from which you can travel around the circuit **once** (visiting every station exactly once and returning to your starting point), *without ever running out of gas*. At each station, you fill up with gas[i] and spend cost[i] to get to the next. If there is no solution, return -1.

### Examples  

**Example 1:**  
Input: `gas = [1,2,3,4,5]`, `cost = [3,4,5,1,2]`  
Output: `3`  
*Explanation:  
Start at station 3: tank = 4.  
Travel to 4: tank = 4 - 1 + 5 = 8.  
Travel to 0: tank = 8 - 2 + 1 = 7.  
Travel to 1: tank = 7 - 3 + 2 = 6.  
Travel to 2: tank = 6 - 4 + 3 = 5.  
Travel back to 3: tank = 5 - 5 + 4 = 4 (>=0, so circuit can be completed).*

**Example 2:**  
Input: `gas = [2,3,4]`, `cost = [3,4,3]`  
Output: `-1`  
*Explanation:  
Starting at station 0: Not enough gas to reach next.  
Starting at station 1: Not enough gas.  
Starting at station 2: tank = 4. Travel to 0: tank = 4 - 3 + 2 = 3. To 1: tank = 3 - 3 + 3 = 3. To 2: tank = 3 - 4 = -1.  
Can't complete circuit from any station.*

**Example 3:**  
Input: `gas = [5,1,2,3,4]`, `cost = [4,4,1,5,1]`  
Output: `4`  
*Explanation:  
Start at station 4: tank = 4.  
Travel to 0: tank = 4 - 1 + 5 = 8.  
To 1: tank = 8 - 4 + 1 = 5.  
To 2: tank = 5 - 4 + 2 = 3.  
To 3: tank = 3 - 1 + 3 = 5.  
To 4: tank = 5 - 5 + 4 = 4 (>=0, completed the loop).*

### Thought Process (as if you’re the interviewee)  
First, let's try brute force:
- From each station, simulate the entire trip to see if you can make it around the circuit.  
- This would give O(n²) time, which is too slow for large n.

Let’s optimize:
- If total gas across all stations is less than total cost, **it's impossible** to complete the circuit, so return -1 immediately.
- Otherwise, the main insight:  
  As we iterate, if our tank < 0 at station i, none of the stations between our previous start and i can ever be solution. So, we set our start to i+1 and reset the tank.
- Only one valid solution possible if there's any; the greedy approach gives us an O(n) answer.

### Corner cases to consider  
- `gas` and `cost` are empty (`n == 0`)  
- Only one station (`n == 1`)
- All gas[i] and cost[i] are zero
- Sum of all gas equals sum of all cost, but at some point tank goes negative
- There’s exactly one station you can start with, and it’s at the end or beginning
- Large input values close to integer boundaries

### Solution

```python
def canCompleteCircuit(gas, cost):
    n = len(gas)
    total_gas = 0      # Overall sum of gas - cost
    curr_gas = 0       # Tank for current starting point
    start = 0          # Candidate start index
    
    for i in range(n):
        diff = gas[i] - cost[i]
        total_gas += diff
        curr_gas += diff
        
        # If curr_gas < 0, can't reach station i+1 from current start
        if curr_gas < 0:
            start = i + 1
            curr_gas = 0
    
    # If there is enough gas overall, start index is the answer
    return start if total_gas >= 0 else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Only a single pass through the input arrays is needed (once each).
- **Space Complexity:** O(1)  
  Only fixed number of variables (no extra space proportional to input size).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you must return all stations that could allow for a valid trip?
  *Hint: Consider whether multiple answers are possible and why/why not.*
  
- How would you handle floating-point inaccuracies if gas and cost were non-integers?
  *Hint: Consider sum tolerance/epsilon in comparisons.*

- If instead of a circle, the path was linear with possible dead ends, how would your approach change?
  *Hint: Could you use a sliding window or prefix sums?*

### Summary
This problem uses a **greedy + cumulative sum** pattern: if at any segment you run out of "resources", the only place to look is after your failure point. This is a classic pattern for single-pass optimal subarray/cycle search (like Maximum Subarray/Kadane’s algorithm variant). The solution pattern can be applied wherever you have to find a feasible start under linear cumulative constraints with a cycle or wrap-around property.