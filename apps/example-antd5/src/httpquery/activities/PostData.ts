import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { GlobalQuery } from "httpquery/lib/classes/RestfulQuery"
import { IPostConfig, IRestfulQuerySession } from "httpquery/lib/interfaces"

@Activity(PostData.NAME)
export class PostData extends AbstractActivity<IPostConfig> {
  public static NAME = "example.PostData"
  public static OUTPUT_NAME_DATA = "dataOut"
  public static OUTPUT_NAME_POSTING = "posting"
  public static OUTPUT_NAME_ERROR = "error"
  public querySession?: IRestfulQuerySession;

  constructor(meta: IActivityDefine<IPostConfig>) {
    super(meta)
  }

  @Input()
  inputHandler(data: unknown): void {
    GlobalQuery?.save({ ...this.config, data }, {
      onData: this.complateHandler,
      onError: this.errorHandler,
      onLoading: this.loadinghandler,
    })
  }

  complateHandler = (data: unknown) => {
    this.next(data, PostData.OUTPUT_NAME_DATA)
  }

  errorHandler = (error?: Error) => {
    this.next(error, PostData.OUTPUT_NAME_ERROR)
  }

  loadinghandler = (loading?: boolean) => {
    this.next(loading, PostData.OUTPUT_NAME_POSTING)
  }

  destory = () => {
    this.querySession?.destory()
  }
}