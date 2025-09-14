### Leetcode 3673 (Hard): Find Zombie Sessions [Practice](https://leetcode.com/problems/find-zombie-sessions)

### Description  
Given a table of user sessions, where each session has a start and end time (with possible overlaps), **a zombie session** is a session that is still active but whose parent session already ended long ago—commonly meaning a child session whose parent process is no longer alive, but the child lingers as a defunct/zombie process.  
You are given the session details, often as tuples or records with (session_id, parent_id, start_time, end_time).  
Find all **zombie session_ids**: sessions that are not yet ended, but their parent session (if any) ended before the current time.

### Examples  

**Example 1:**  
Input:  
sessions = `[ [1, null, 10, 20], [2, 1, 15, null] ]`, now = 21  
Output: `[2]`  
*Explanation: Session 1 ended at 20, and its child session 2 started at 15 and hasn't ended (end_time = null). Since 'now' is 21, session 2 is still active but its parent already ended, so it's a zombie.*

**Example 2:**  
Input:  
sessions = `[ [1, null, 1, 10], [2, 1, 5, 8], [3, 1, 7, null], [4, null, 15, null] ]`, now = 12  
Output: `[3]`  
*Explanation: Session 3 is still active. Its parent (1) ended at 10, which is before 'now' (12), so session 3 is a zombie. Sessions 2 and 4 are not zombies (2 ended, 4 has no parent).*

**Example 3:**  
Input:  
sessions = `[ [1, null, 2, null], [2, 1, 3, null], [3, 2, 4, null] ]`, now = 5  
Output: `[]`  
*Explanation: All sessions are still active; none of their parents has ended before 'now', so there are no zombies.*

### Thought Process (as if you’re the interviewee)  

First, let's clarify: a *zombie session* happens when the session is still active (end_time = null or > now), but its parent finished before now.

**Brute-force:** For every session, if it's open (end_time is null or > now), look up its parent—if there is a parent and the parent's end_time is not null and ≤ now, mark it as zombie.  
- Brute-force would simply scan sessions and for each one, scan to find parent—O(n²).

**Optimized:**  
- Build a `session_id → session info` mapping for quick lookups.
- For each session, if it's active and has a parent, look up parent's info directly.
- This brings us to O(n) time with O(n) extra space.

**Corner cases:** Sessions with parent_id = null should never be zombies. If the parent session doesn't exist in the input list—depends on constraints, could ignore, or treat as non-zombie. Sessions with both parent and child still active are not zombies.

I choose the mapping-based O(n) approach for both speed and clarity.

### Corner cases to consider  
- Sessions with no parent (parent_id = null)
- Sessions with parent_id referencing missing session (should specify: return or skip)
- parent end_time = null (parent still active, so not a zombie)
- session end_time ≠ null but < now (already ended, not a zombie)
- Multiple nested sessions (only immediate parent considered)
- Sessions where parent ends exactly at now (≤ now logic)

### Solution

```python
def findZombieSessions(sessions, now):
    # Map each session_id to its session info
    session_map = {}
    for sess in sessions:
        session_id = sess[0]
        parent_id = sess[1]
        start = sess[2]
        end = sess[3]
        session_map[session_id] = {'parent': parent_id, 'start': start, 'end': end}

    zombies = []

    for sess in sessions:
        sess_id, parent_id, start, end = sess

        # Skip if session is already ended
        if end is not None and end <= now:
            continue

        # No parent, can't be zombie
        if parent_id is None:
            continue

        parent = session_map.get(parent_id)
        if parent is None:
            continue  # Or raise error or treat as not zombie

        parent_end = parent['end']
        # Parent ended before/at 'now'
        if parent_end is not None and parent_end <= now:
            zombies.append(sess_id)

    return zombies
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of sessions; we traverse all sessions twice—once to build the map, once to check conditions.
- **Space Complexity:** O(n) for the session_id → info mapping and potentially O(n) for the zombies list if all are zombies.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the parent can itself be a zombie (should we recurse up the parent chain)?  
  *Hint: Walk up ancestors, not just immediate parent.*

- How would you handle if sessions form a cycle?  
  *Hint: Track visited nodes to detect cycles.*

- Can a session have multiple concurrent parents (many-to-many)?  
  *Hint: Would need more elaborate data structure, ask to clarify data model.*

### Summary
This problem uses the **hash map / direct lookup** pattern to reduce repeated parent scans and enable O(1) access by parent_id. The main "session dependency" check is common in process trees, graph problems, and OS process management—similar techniques apply for orphaned nodes or defunct processes in system monitoring tools.

### Tags

### Similar Problems
