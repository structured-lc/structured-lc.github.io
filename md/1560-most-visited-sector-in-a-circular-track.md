### Leetcode 1560 (Easy): Most Visited Sector in a Circular Track [Practice](https://leetcode.com/problems/most-visited-sector-in-a-circular-track)

### Description  
Given a **circular track with n sectors** labeled from 1 to n, you're given the path of a marathon as an integer array `rounds` where the \(i^{th}\) round starts at `rounds[i-1]` and ends at `rounds[i]`. The marathon starts at `rounds`. During each round, the path follows sectors in ascending order, going from 1 to n and wrapping around as necessary. Find all **sectors visited the most number of times**, sorted in ascending order.

### Examples  

**Example 1:**  
Input: `n = 4, rounds = [1,3,1,2]`  
Output: `[1,2]`  
Explanation:  
1 → 2 → 3 (end round 1), 3 → 4 → 1 (end round 2), 1 → 2 (end round 3).  
Sectors 1 and 2 are each visited twice, more than others.

**Example 2:**  
Input: `n = 2, rounds = [2,1,2,1,2,1,2,1,2]`  
Output: `[2]`  
Explanation:  
Sector 2 is visited in every round start and end, so it's the most visited.

**Example 3:**  
Input: `n = 7, rounds = [1,3,5,7]`  
Output: `[1,2,3,4,5,6,7]`  
Explanation:  
Every sector is visited exactly the same number of times through sequential traversal.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Keep a visit counter for each sector.
  - For each transition in `rounds`, increment the visit count for all sectors you pass through.
  - At the end, find sectors with the maximum visit count.
  - But n and rounds can be large — is there a pattern?

- **Observation/Optimization:**  
  - The *most visited sectors* are always the ones between the start of the first round (`rounds`) and the end (`rounds[-1]`) — inclusive, going in ascending order and wrapping around as needed.  
  - Because for every lap, the sectors between the start and end are traversed the *maximum* number of times; others are visited strictly fewer times.
  - So, just find the ascending sequence from `rounds` to `rounds[-1]` (wrap around if needed).

- **Why is this optimal?**  
  - O(n) time, O(1) extra space apart from the answer.
  - No need to track every sector’s counter — we deduce directly which sectors get the most visits.

### Corner cases to consider  
- Only one sector (`n=1`).
- `rounds` contains only start and end (no in-between).
- The track "wraps around" (start index > end index).
- All sectors get visited equally.
- Large n, but only a few rounds.

### Solution

```python
def mostVisited(n, rounds):
    # Start sector and end sector
    start = rounds[0]
    end = rounds[-1]
    
    # If start <= end, the interval doesn't wrap; fill [start, end]
    if start <= end:
        return [i for i in range(start, end + 1)]
    else:
        # Wrapped interval: [1, end] + [start, n]
        return [i for i in range(1, end + 1)] + [i for i in range(start, n + 1)]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - In the worst case (when start = n and end = n), we may output all sectors, so we scan up to n.
  - Constructing the output list is linear in number of sectors being output.

- **Space Complexity:** O(k)  
  - Where k is the number of most visited sectors (at most n).
  - No extra storage beyond the output itself.


### Potential follow-up questions (as if you’re the interviewer)  

- What if you were to return all sectors sorted by number of visits (not just the most visited sectors)?  
  *Hint: Track per-sector counts with an array and sort by counts.*

- How would the solution change if the sectors were traversed in descending order?  
  *Hint: The direction affects which sectors are included and order of traversal.*

- What if the number of sectors n is extremely large but the number of rounds is small?  
  *Hint: Can you avoid generating large arrays and compute ranges efficiently?*


### Summary
This problem uses a **simulation pattern**: find the max-visited range on a circular array, applying careful interval logic to avoid full simulation. The O(n) solution leverages properties of modular arithmetic and wrap-arounds, and variants can appear in circular scheduling, token passing, or process rotation problems.