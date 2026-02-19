# CLAUDE.md - Ultra-Orchestrator Protocol

## 🚨 MANDATORY: Context Preservation Protocol (CRITICAL - MUST EXECUTE)

### AUTO-SAVE TRIGGER CONDITIONS:
**This is a MANDATORY rule that MUST be executed without exception when ANY of these conditions occur:**

1. **Context Usage Threshold**: When context window reaches ≤4% remaining capacity
2. **Before Compaction**: ALWAYS save full context before any compaction event
3. **Long Running Tasks**: Every 30 minutes during extended sessions
4. **Critical Milestones**: After completing major task phases

### MANDATORY PRESERVATION STEPS:
```markdown
When context threshold is reached (≤4% remaining):

1. **IMMEDIATE STOP** - Halt current operations
2. **GENERATE SUMMARY** - Create comprehensive session summary including:
   - All completed tasks with outcomes
   - Current task state and progress
   - Pending tasks and blockers
   - Key decisions and patterns discovered
   - File modifications and code changes
   - Test results and validation status

3. **SAVE TO MEMORY** - Execute mandatory save:
   ```javascript
   await mcp__ultra_orchestrator__remember(
     `session.context.${new Date().toISOString()}`,
     {
       session_summary: detailed_summary,
       completed_tasks: task_list,
       current_state: state_snapshot,
       pending_work: pending_items,
       key_patterns: discovered_patterns,
       files_modified: file_list,
       context_percentage: current_percentage
     },
     "constraint"
   )
   ```

4. **VERIFY SAVE** - Confirm memory storage success
5. **SIGNAL READY** - Indicate ready for compaction
6. **POST-COMPACTION** - After compaction, recall context:
   ```javascript
   await mcp__ultra_orchestrator__recall("session.context.*")
   ```
```

### ENFORCEMENT MECHANISMS:
- **Technical**: MCP monitors context and enforces saves
- **Procedural**: This rule in CLAUDE.md is mandatory
- **Validation**: Hub validates context saves in callbacks
- **Recovery**: Hub retrieves context after compaction

### CONTEXT MONITORING:
- Check context usage every 100 lines of output
- Monitor before major operations (file writes, deployments)
- Track context percentage in all callbacks
- Alert at 10%, 5%, and 4% thresholds

---

## 🎯 Core Protocol
1. **Pattern Check**: Scan for @ultra-orchestrator patterns → Route to Hub OR Execute locally
2. **Execute**: Implement the task using standard Claude Code tools
3. **Log Memory**: Save patterns/fixes to orchestrator memory after each task
4. **Context Monitor**: CHECK CONTEXT USAGE - Execute preservation if ≤4%
5. **Callback**: Report completion with logs and validation to hub
6. **Wait**: Wait for next command or completion signal from hub

---

## 🔀 Routing Rules

### Route to Hub (Planning & Orchestration)
**If message contains ANY of these patterns:**
- `@ultra-orchestrator:` (anywhere in message)
- `@ultra-orchestrator` (with or without colon)
- `route to orchestrator` | `use hub` | `send to orchestrator`
- Long messages (>500 chars) + orchestrator mention

**Action**: `mcp__ultra_orchestrator__ingest_nl`

### Execute Locally (Implementation)
**If NO orchestrator patterns detected:**
- Work orders from hub
- File modifications and code changes
- Bug fixes and implementations

**Action**: Standard tools (Read, Write, Edit, Bash, etc.)

---

## 🧠 Memory Protocol

### When to Save Memory (REQUIRED):
- ✅ **After every completed task** - Save solutions and patterns
- ✅ **Before deployment** - Check for existing patterns to avoid mistakes
- ✅ **When fixing bugs** - Store the fix for future reference
- ✅ **When discovering patterns** - Save infrastructure configurations
- 🚨 **WHEN CONTEXT ≤4%** - MANDATORY full session save

### How to Use Orchestrator Memory:
```javascript
// Store patterns/fixes
await mcp__ultra_orchestrator__remember("key", "solution/pattern", "category")

// Retrieve before similar work
await mcp__ultra_orchestrator__recall("key")

// Validate changes against constraints
await mcp__ultra_orchestrator__validateAgainst(proposed_change)

// MANDATORY: Save context when low
if (context_remaining <= 4) {
  await mcp__ultra_orchestrator__remember(
    "session.context.emergency",
    full_session_state,
    "constraint"
  )
}
```

### Memory Categories:
- `"schema"` - Database patterns and constraints
- `"fix"` - Bug fixes and solutions
- `"decision"` - Architectural choices
- `"constraint"` - Deployment and infrastructure patterns + CONTEXT SAVES

---

## 🔄 Autopilot Callback Protocol

### Always Callback After Task Completion:
1. **Validation Results** - Did the task complete successfully?
2. **Log Files** - Include relevant output, errors, test results
3. **Status Flag** - Set `next_action_needed: true/false`
4. **Issues Encountered** - List any blockers or problems
5. **Context Status** - Report current context usage percentage

### Enhanced Callback Format:
```javascript
await mcp__ultra_orchestrator__autopilot_callback({
  task_id: "task-identifier",
  status: "completed|failed|partial|blocked",
  results: "Detailed description of what was accomplished",
  next_action_needed: true, // false if fully complete
  issues_encountered: ["list", "of", "issues"], // empty if none
  change_details: {
    type: "code|database|config",
    operation: "create|update|delete",
    code: "relevant code snippet"
  },
  context_status: {
    percentage_remaining: context_percentage,
    saved_to_memory: boolean,
    needs_compaction: boolean
  }
})
```

### Wait Protocol:
- ✅ **After callback** - Wait for hub response
- ✅ **Hub will respond** with next task OR completion signal
- ✅ **Do not continue** without explicit next instruction from hub
- 🚨 **If context low** - Save before continuing

---

## ⚙️ Essential Coding Rules

### Required Patterns:
- ✅ **No mock data** - Use real data from database/APIs only
- ✅ **Schema validation** - Check database schema before operations
- ✅ **Error handling** - Log errors with context, user-friendly messages
- ✅ **Security first** - Validate inputs, use env variables for secrets
- 🚨 **Context preservation** - MANDATORY save at 4% threshold

### Forbidden Patterns:
- ❌ Mock/placeholder data in production code
- ❌ Hardcoded test values or dummy content
- ❌ Exposing stack traces to users
- ❌ Database operations without schema validation
- ❌ Ignoring context preservation warnings
- ❌ Proceeding past 4% context without saving

---

## 🏃‍♂️ Execution Flow Example

```
1. User: "@ultra-orchestrator: Fix BlogCraft middleware bundling"
   → Route to hub via mcp__ultra_orchestrator__ingest_nl

2. Hub responds with work order: "Create outputFileTracingIncludes config"
   → Execute locally: Read files, implement fix, run tests
   → MONITOR: Check context usage

3. Context reaches 4% threshold:
   → STOP: Halt current task
   → SAVE: Full context to memory
   → WAIT: For compaction

4. Task complete → Callback to hub:
   → mcp__ultra_orchestrator__autopilot_callback with results and context status

5. Hub responds: "Task complete" OR "Next: Deploy and test"
   → Wait for instruction, then execute next task or finish

6. Store solution in memory:
   → mcp__ultra_orchestrator__remember("nextjs.middleware.bundling", solution)
```

---

## 🐛 Debug Logging

**When routing**: `🎯 ROUTING TO HUB: @ultra-orchestrator pattern found`
**When executing**: `🔨 EXECUTING LOCALLY: Work order received`
**When storing memory**: `💾 SAVED TO MEMORY: [category] - [key]`
**When calling back**: `📞 CALLBACK TO HUB: Task [status] with [issues_count] issues`
**When context low**: `🚨 CONTEXT WARNING: [percentage]% remaining - executing mandatory save`
**When context saved**: `✅ CONTEXT PRESERVED: Session saved to memory`

---

## 📊 Context Usage Indicators

Monitor these signs of high context usage:
- Response times increasing
- More frequent "continuing..." messages
- Reduced detail in responses
- Compaction warnings appearing

When you see these, proactively check context and save if needed.

---

*Context preservation is MANDATORY. Save early, save often, never lose work.*