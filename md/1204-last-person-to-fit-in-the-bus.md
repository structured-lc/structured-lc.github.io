### Leetcode 1204 (Medium): Last Person to Fit in the Bus [Practice](https://leetcode.com/problems/last-person-to-fit-in-the-bus)

### Description  
Given a queue of people waiting to board a bus, each person has a unique name, a recorded *weight*, and a *turn* value that indicates their order in the line (1-based, unique and increasing by one for each person). The bus has a fixed **weight limit** (1000 kg). People board the bus one by one according to the `turn` value (ascending order), and each person boards only if the total accumulated weight (including their own) does **not exceed** the weight limit. Your task: **Return the name of the last person who can fit on the bus without exceeding the limit**.

### Examples  

**Example 1:**  
Input:  
Queue table:
| person_name | weight | turn |
|-------------|--------|------|
| Alice       | 300    | 1    |
| Bob         | 500    | 2    |
| Charlie     | 400    | 3    |

Output:  
`Bob`  
*Explanation: Alice (300) boards, Bob (300+500=800) boards, but if Charlie tried: 800+400=1200 > 1000, so can't board. Thus, Bob is the last.*

**Example 2:**  
Input:  
Queue table:
| person_name | weight | turn |
|-------------|--------|------|
| John        | 250    | 1    |
| Jane        | 350    | 2    |
| Max         | 400    | 3    |

Output:  
`Max`  
*Explanation: John (250), Jane (250+350=600), Max (600+400=1000); total exactly fits, so Max is last.*

**Example 3:**  
Input:  
Queue table:
| person_name | weight | turn |
|-------------|--------|------|
| Sam         | 800    | 1    |
| Tom         | 300    | 2    |

Output:  
`Sam`  
*Explanation: Sam (800) boards, Tom (800+300=1100), which exceeds; so only Sam fits.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Iterate in order of `turn`, keep a running sum of weights. For each person, if adding their weight does not exceed 1000, update a `last_person` variable. If it does, stop and return the `last_person`.
- **SQL/Aggregation:** Use a window function to calculate the *running total* (cumulative sum) of weights ordered by `turn`. Find the last entry (largest turn) where cumulated weight ≤ 1000.
- **Efficiency:** The window function approach, or a simple loop in imperative languages, ensures a single pass (O(n)). This is optimal since each entry must be checked in order.
- **Trade-offs:** No complex structures needed; since the turn numbers are unique and determine order, no extra sorting (beyond initial order by turn).

### Corner cases to consider  
- Only one person can fit (first is overweight).
- All people can fit exactly up to the limit.
- Some weights are zero (should still allow to board).
- Edge case: last person exactly hits the weight limit.
- Duplicate names but unique turns (should return the correct name instance by proper ordering).
- Empty table (no one in the queue; should handle gracefully if possible).

### Solution

```python
def last_person_to_fit(queue, weight_limit=1000):
    # queue: List[Dict] with keys 'person_name', 'weight', 'turn'
    # Sort by turn so that people are in correct boarding order
    queue.sort(key=lambda x: x['turn'])
    running_weight = 0
    last_person = None
    for person in queue:
        # Add this person's weight to the running total
        # Check if after adding, we still don't exceed the limit
        if running_weight + person['weight'] <= weight_limit:
            running_weight += person['weight']
            last_person = person['person_name']
        else:
            # If including this person would exceed the limit
            break
    return last_person

# Example usage:
queue = [
    {"person_name": "Alice", "weight": 300, "turn": 1},
    {"person_name": "Bob", "weight": 500, "turn": 2},
    {"person_name": "Charlie", "weight": 400, "turn": 3},
]
print(last_person_to_fit(queue))  # Output: "Bob"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  There’s one pass to sort (if not already in order), another pass to accumulate weights. Sorting is O(n log n), but if input is presorted or n is small, this is dominated by the linear scan.
- **Space Complexity:** O(1)  
  Only a few variables for accumulation. No extra data structures used (other than input).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the weight limit changes or is dynamic per bus?
  *Hint: Accept weight limit as a parameter; nothing else changes.*

- Suppose there are multiple buses arriving, and you want to assign as many people as possible in order to each bus without exceeding the limit on any. How would you assign people (greedy partition, bin-packing)?
  *Hint: Simulate for each bus, reset the accumulator, start a new batch once the limit is hit.*

- How would you return the list of people who did not board?
  *Hint: Continue iteration to collect unboarded people after the limit is hit.*

### Summary
This is a classic **prefix-sum / running total** problem where you stop at the last index before a cumulative threshold is exceeded. The SQL version uses window functions (`SUM(weight) OVER (ORDER BY turn)`) for the running total. Patterns from this problem generalize to boarding, scheduling, binning, and streaming with cumulative constraints. This is commonly seen in queue and streaming problems, as well as greedy algorithms for packing or scheduling.


### Flashcard
Use a running sum (window function or loop) ordered by turn to find the last person whose cumulative weight does not exceed 1000.

### Tags
Database(#database)

### Similar Problems
- Running Total for Different Genders(running-total-for-different-genders) (Medium)
- The Number of Seniors and Juniors to Join the Company(the-number-of-seniors-and-juniors-to-join-the-company) (Hard)
- The Number of Seniors and Juniors to Join the Company II(the-number-of-seniors-and-juniors-to-join-the-company-ii) (Hard)