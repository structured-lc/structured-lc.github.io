### Leetcode 857 (Hard): Minimum Cost to Hire K Workers [Practice](https://leetcode.com/problems/minimum-cost-to-hire-k-workers)

### Description  
Given `n` workers where each worker has a `quality[i]` and a minimum wage expectation `wage[i]`, you are to hire exactly `K` workers as a group. The payment rules are:

- Every worker in the group must be paid in proportion to their quality (i.e., if one has twice the quality of another, they must be paid twice as much).
- Every worker must get at least their minimum wage expectation.

Your goal: **Return the minimum total wage needed to hire exactly `K` workers under these rules.**

### Examples  

**Example 1:**  
Input: `quality = [10, 20, 5], wage = [70, 50, 30], K = 2`  
Output: `105.00000`  
*Explanation: Possible to hire worker 0 and 2. Payment ratios: worker 0 should get pay proportional to 10, worker 2 proportional to 5. We must pay them at least their minimum wage, which means their pay per "quality" must be at least 70/10 = 7 for worker 0 and 30/5 = 6 for worker 2, so at least 7 for the group. Total pay: (10+5) × 7 = 105.*

**Example 2:**  
Input: `quality = [3, 1, 10, 10, 1], wage = [4, 8, 2, 2, 7], K = 3`  
Output: `30.66667`  
*Explanation: Hire worker 0, 2, and 3. Must pay at least 4/3 ≈ 1.333 to worker 0, 2/10 = 0.2 to worker 2, and 2/10 = 0.2 to worker 3. Maxi-mum ratio among them is 1.333. Total quality is 3+10+10=23. Total pay: 23×1.333... ≈ 30.66667.*

**Example 3:**  
Input: `quality = [5, 10, 15], wage = [20, 50, 105], K = 2`  
Output: `75.00000`  
*Explanation: If we hire worker 0 and 1, the minimum factor per quality is max(20/5, 50/10) = 4. Total quality: 5+10=15. Cost: 15×4=60. If we hire worker 1 and 2, factor is max(50/10, 105/15) = 7. Cost: 25×7=175. Minimum is 60, so the answer is 60.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  - Try every possible group of K workers.
  - For each group:
    - Find the highest wage/quality ratio in the group (`max(wage[i]/quality[i])` among the group).
    - Use that as the wage-per-quality, and pay everyone in the group proportional to their quality.
    - Check minimum cost among all such groups.
  - **Downside:** Combinatorial explosion (`C(n, K)`).

- **Optimization:**  
  - Notice: Any hiring group is limited by the "tightest" worker in per-quality wage: The highest ratio determines the "rate" everyone gets, due to the minimum wage expectations.
  - For each worker, try making that worker the “tightest” constraint—everyone gets at least his wage/quality ratio as pay.
  - Sort workers by wage/quality ascending.
  - As we sweep through workers by increased ratio, keep a running min-heap of K-1 lowest-quality workers seen so far.
  - For each candidate, form a group with this “anchor” and the K-1 lowest others, sum their total quality, and compute total wage at this ratio.
  - Track minimum total wage found.
  - Using a heap on quality guarantees lowest total pay for a given ratio.

- **Final approach:**  
  - Sort all workers by their wage/quality ratio (ascending).
  - For each position >= K-1:
    - Maintain a max-heap of K-1 smallest qualities.
    - For each candidate as the tightest-ratio anchor, use the heap to sum total quality.
    - Compute total cost.

### Corner cases to consider  
- K = 1 (Must hire only one worker)
- All qualities and/or all wages are equal
- There are more than K workers but only one way to pick (N=K)
- Wages much higher for some, but their ratio still favorable
- Large numbers (check floating-point precision)
- Minimum wage exceeds proportional pay for all groups except one
- Maximum number of workers (N = 10,000)

### Solution

```python
import heapq

def mincostToHireWorkers(quality, wage, K):
    # Pair each worker's ratio (wage/quality) with their quality
    workers = sorted(
        [(w / q, q) for q, w in zip(quality, wage)]
    )
    res = float('inf')
    total_quality = 0
    # Use a max-heap for qualities (invert sign: heapq is min-heap by default)
    max_heap = []
    for i in range(len(workers)):
        ratio, q = workers[i]
        # Add this quality into heap and running sum
        heapq.heappush(max_heap, -q)
        total_quality += q
        # If we exceeded K, remove largest quality (reduce cost)
        if len(max_heap) > K:
            total_quality += heapq.heappop(max_heap)
        # If we have exactly K workers, update result
        if len(max_heap) == K:
            total_wage = total_quality * ratio
            res = min(res, total_wage)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Sorting workers by their ratio: O(n log n)
  - Heap operations for n workers: O(n log K)
  - So total is O(n log n)

- **Space Complexity:** O(n)  
  - For the sorted workers list and the max-heap (stores up to K elements)

### Potential follow-up questions (as if you’re the interviewer)  

- If workers could be assigned *any* wage above their minimum (not strictly proportional by quality), what changes?
  *Hint: You'd need a different approach than strict proportionality.*

- What if some workers refuse to work with certain others, i.e., groups must satisfy constraints?
  *Hint: Think graph connectivity or grouping feasibility.*

- What if we needed to form *multiple* such teams, possibly with overlapping personnel?
  *Hint: Partition/covering the list with constraints.*

### Summary
This problem is a classic example of a **heap + greedy + sorting** pattern. The idea is to leverage the crucial proportional wage restriction, transforming the search space into an efficient heap-based selection problem by focusing on the wage/quality ratio, and always maintaining the minimum heap of worker qualities. This pattern—using a ratio or efficiency for sorting, and a heap to maintain best subsets—applies to several optimization problems, especially those involving cost minimization over competitive attributes.